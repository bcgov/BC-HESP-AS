import {
  Box,
  Circle,
  Flex,
  FlexProps,
  Heading,
  Image,
  Text,
  UseRadioProps,
  useRadio,
  useRadioGroup,
} from "@chakra-ui/react"
import { observer } from "mobx-react-lite"
import * as R from "ramda"
import React, { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { IPermitType } from "../../../models/permit-classification"
import { useMst } from "../../../setup/root"
import { IOption } from "../../../types/types"
import { CustomToast } from "../base/flash-message"
import { SharedSpinner } from "../base/shared-spinner"

interface IPermitTypeRadioSelect extends FlexProps {
  fetchOptions: () => Promise<IOption<IPermitType>[]>
  onChange: (value) => void
  value: string
}

export const PermitTypeRadioSelect = observer(({ onChange, value, fetchOptions, ...rest }: IPermitTypeRadioSelect) => {
  const { getRadioProps } = useRadioGroup({
    name: "permitType",
    defaultValue: null,
    onChange: onChange,
  })

  const { permitClassificationStore } = useMst()
  const { isPermitTypeLoading } = permitClassificationStore

  const [permitTypeOptions, setPermitTypeOptions] = useState<IOption<IPermitType>[]>([])

  useEffect(() => {
    ;(async () => {
      setPermitTypeOptions(await fetchOptions())
    })()
  }, [])

  const { t } = useTranslation()

  if (isPermitTypeLoading) return <SharedSpinner />

  if (R.isEmpty(permitTypeOptions)) {
    return <CustomToast status="error" description={t("translation:permitApplication.new.noContactsAvailable")} />
  }

  return (
    <Flex gap={4} flexWrap="wrap" role="radiogroup" {...rest}>
      {permitTypeOptions.map((option) => {
        const radio = getRadioProps({ value: option.value.id })
        return <PermitTypeRadioCard key={option.value.id} permitType={option.value} {...radio} />
      })}
    </Flex>
  )
})

interface IPermitTypeRadioCardProps extends UseRadioProps {
  permitType: IPermitType
}

export const PermitTypeRadioCard = (props: IPermitTypeRadioCardProps) => {
  const { getInputProps, getRadioProps } = useRadio(props)
  const { permitType, isChecked } = props

  const input = getInputProps()
  const checkbox = getRadioProps()

  return (
    <Box as="label" role="radio">
      <input aria-label={`${permitType.name} selector`} {...input} />
      <Flex
        {...checkbox}
        direction="column"
        gap={4}
        align="center"
        cursor="pointer"
        borderWidth="1px"
        borderRadius="sm"
        borderColor="border.light"
        _checked={{
          borderColor: "theme.blueAlt",
        }}
        _focus={{
          boxShadow: "outline",
        }}
        p={4}
      >
        <Flex direction="column" w="full">
          <Flex gap={4} flex={1}>
            <Circle size="15px" bg={isChecked ? "theme.blueAlt" : "greys.grey02"} zIndex={10} />
            <Heading as="h3" fontSize="lg" mb={0}>
              {permitType.name}
            </Heading>
          </Flex>
          <Text alignSelf="center" mt={2}>
            {permitType.description}
          </Text>
        </Flex>
        <Box flex={1}>
          <Image w="334px" src={permitType.imageUrl} alt={permitType.name} objectFit="cover" />
        </Box>
      </Flex>
    </Box>
  )
}
