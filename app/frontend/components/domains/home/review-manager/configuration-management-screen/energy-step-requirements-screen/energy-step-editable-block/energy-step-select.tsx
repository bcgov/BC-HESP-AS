import {
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Portal,
  VStack,
} from "@chakra-ui/react"
import { CaretDown } from "@phosphor-icons/react"
import { t } from "i18next"
import { observer } from "mobx-react-lite"
import * as R from "ramda"
import React from "react"
import { useMst } from "../../../../../../../setup/root"
import { EEnergyStep } from "../../../../../../../types/enums"
import { i18nPrefix } from "../i18n-prefix"

interface IProps {
  onChange: (event: any) => void
  value: EEnergyStep
  isDisabled?: boolean
  allowZero?: boolean
  showFirstOnly?: boolean
}

export const EnergyStepSelect = observer(function EnergyStepSelect({
  showFirstOnly,
  onChange,
  value,
  isDisabled,
  allowZero,
}: IProps) {
  const {
    stepCodeStore: { getEnergyStepOptions },
  } = useMst()
  const options = getEnergyStepOptions(allowZero)
  return (
    <Popover placement="bottom-end">
      {({ onClose }) => (
        <>
          <PopoverTrigger>
            <InputGroup pointerEvents={isDisabled ? "none" : "auto"}>
              <Input
                as={Flex}
                bg="white"
                cursor="pointer"
                alignItems="center"
                borderColor="gray.200"
                borderWidth={1}
                rounded="base"
                shadow="base"
                isDisabled={isDisabled}
              >
                {!R.isNil(value)
                  ? t(`${i18nPrefix}.stepRequired.energy.options.${showFirstOnly ? options[0] : value}`)
                  : t(`ui.selectPlaceholder`)}
              </Input>
              <InputRightElement children={<CaretDown color="gray.300" />} />
            </InputGroup>
          </PopoverTrigger>
          <Portal>
            <PopoverContent>
              <VStack align="start" spacing={0}>
                {options.map((value, i) => (
                  <Flex
                    key={value}
                    onClick={() => {
                      onChange(value)
                      onClose()
                    }}
                    px={2}
                    py={1.5}
                    w="full"
                    borderTop={i === options.length - 1 ? "1px solid" : undefined}
                    borderColor="border.light"
                    cursor="pointer"
                    _hover={{ bg: "hover.blue" }}
                  >
                    {t(`${i18nPrefix}.stepRequired.energy.options.${value}`)}
                  </Flex>
                ))}
              </VStack>
            </PopoverContent>
          </Portal>
        </>
      )}
    </Popover>
  )
})
