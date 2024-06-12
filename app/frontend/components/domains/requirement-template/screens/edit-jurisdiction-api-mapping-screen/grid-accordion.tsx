import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  ButtonGroup,
  IconButton,
  Stack,
  Text,
  UseAccordionProps,
} from "@chakra-ui/react"
import { X } from "@phosphor-icons/react"
import { observer } from "mobx-react-lite"
import pluck from "ramda/src/pluck"
import React, { useEffect, useState } from "react"
import { useController, useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { IRequirementBlockMapping } from "../../../../../models/requirement-block-mapping"
import { ITemplateVersion } from "../../../../../models/template-version"
import { IRequirementMap, ISimplifiedRequirementsMap } from "../../../../../types/types"
import { isStepCodePackageFileRequirementCode } from "../../../../../utils/utility-functions"
import { EditableInputWithControls } from "../../../../shared/editable-input-with-controls"
import { SearchGridItem } from "../../../../shared/grid/search-grid-item"
import { RequirementFieldDisplay } from "../../../requirements-library/requirement-field-display"

interface IProps {
  requirementBlockMapping: IRequirementBlockMapping
  templateVersion: ITemplateVersion
  onSaveLocalMapping: (simplifiedRequirementsMapping: ISimplifiedRequirementsMap) => Promise<void | boolean>
}

const searchGridItemProps = {
  borderY: "none",
  borderX: "none",
  borderRight: "1px solid",
  borderColor: "border.light",
  fontSize: "sm",
}

interface IMappingForm {
  localSystemMapping?: string
}

export const GridAccordion = observer(function GridAccordion({
  requirementBlockMapping,
  templateVersion,
  onSaveLocalMapping,
}: IProps) {
  const { t } = useTranslation()
  const [expandedIndex, setExpandedIndex] = useState(0)
  const requirementBlockJson = templateVersion.getRequirementBlockJsonById(requirementBlockMapping.id)
  const isExpanded = expandedIndex === 0

  return (
    <Box display={"contents"}>
      <Accordion
        sx={{
          "& .chakra-collapse": {
            display: `${isExpanded ? "contents" : "none"} !important`, // this is needed for the data grid layout to work
          },
        }}
        display={"contents"}
        index={expandedIndex}
        defaultIndex={0}
        onChange={setExpandedIndex as UseAccordionProps["onChange"]}
        allowToggle
      >
        <AccordionItem display={"contents"}>
          <Text
            as={"h3"}
            style={{
              gridColumn: "1/-1",
            }}
          >
            <AccordionButton
              _expanded={{
                bg: "greys.grey04",
              }}
            >
              <Box flex="1" textAlign="left">
                {requirementBlockJson?.name}{" "}
                <Text as={"span"} fontWeight={700} fontSize={"sm"}>
                  requirement block code: {requirementBlockJson?.sku}
                </Text>
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </Text>
          <AccordionPanel pb={4} bg={"red"} sx={{ display: "contents" }}>
            {(requirementBlockJson.requirements ?? []).map((requirementJson) => {
              return (
                <Box key={requirementJson.id} role={"row"} display={"contents"}>
                  <SearchGridItem fontWeight={700} {...searchGridItemProps}>
                    <EditableLocalSystemMapping
                      requirementMapping={requirementBlockMapping.requirements.get(requirementJson.requirementCode)}
                      onSave={async (localSystemMapping) =>
                        onSaveLocalMapping({
                          [requirementBlockJson.sku]: { [requirementJson.requirementCode]: localSystemMapping },
                        })
                      }
                    />
                  </SearchGridItem>
                  <SearchGridItem fontWeight={700} {...searchGridItemProps}>
                    <Text maxW={"full"}>{requirementJson.requirementCode}</Text>
                  </SearchGridItem>
                  <SearchGridItem {...searchGridItemProps} justifyContent={"flex-start"} alignItems={"flex-start"}>
                    <Stack color={"text.secondary"}>
                      <RequirementFieldDisplay
                        matchesStepCodePackageRequirementCode={isStepCodePackageFileRequirementCode(
                          requirementJson.requirementCode
                        )}
                        requirementType={requirementJson.inputType}
                        label={requirementJson.label}
                        helperText={requirementJson.hint}
                        unit={requirementJson?.inputOptions?.numberUnit}
                        options={pluck("label", requirementJson.inputOptions?.valueOptions ?? [])}
                        selectProps={{
                          maxW: "339px",
                        }}
                        addMultipleContactProps={{
                          shouldRender: true,
                          formControlProps: { isDisabled: true },
                          switchProps: {
                            isChecked: requirementJson?.inputOptions?.canAddMultipleContacts,
                          },
                        }}
                        required={requirementJson?.required}
                      />
                    </Stack>
                  </SearchGridItem>
                </Box>
              )
            })}
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Box>
  )
})

const EditableLocalSystemMapping = observer(function EditableLocalSystemMapping({
  requirementMapping,
  onSave,
}: {
  requirementMapping: IRequirementMap
  onSave: (localSystemMapping: string) => Promise<void | boolean>
}) {
  const { t } = useTranslation()
  const modelLocalSystemMapping = requirementMapping?.local_system_mapping
  const { handleSubmit, control, reset } = useForm<IMappingForm>({
    defaultValues: { localSystemMapping: modelLocalSystemMapping },
  })

  const {
    field: { value, onChange },
    formState: { isSubmitting, isSubmitted },
  } = useController({ control, name: "localSystemMapping" })

  const onSubmit = handleSubmit(async (data) => onSave(data.localSystemMapping?.trim()))

  const resetToModelValue = () => {
    reset({ localSystemMapping: modelLocalSystemMapping })
  }

  useEffect(() => {
    if (modelLocalSystemMapping === value) {
      return
    }

    resetToModelValue()
  }, [modelLocalSystemMapping])

  useEffect(() => {
    if (isSubmitted && modelLocalSystemMapping !== value) {
      resetToModelValue()
    }
  }, [isSubmitted, modelLocalSystemMapping])

  return (
    <EditableInputWithControls
      controlsProps={{
        CustomEditModeControls: ({ getSubmitButtonProps, getCancelButtonProps }) => (
          <ButtonGroup justifyContent="center" size="sm" spacing={2} ml={4} isDisabled={isSubmitting}>
            <Button {...getSubmitButtonProps()} variant={"primary"} isLoading={isSubmitting}>
              {t("ui.onlySave")}
            </Button>
            <IconButton variant={"ghost"} icon={<X />} aria-label={t("ui.cancel")} {...getCancelButtonProps()} />
          </ButtonGroup>
        ),
        iconButtonProps: { isDisabled: isSubmitting, isLoading: isSubmitting },
      }}
      initialHint={t("apiMappingsSetup.edit.table.localFieldEdit.addMapping")}
      w={"full"}
      editablePreviewProps={{ maxW: "full", flex: 1 }}
      value={value}
      onChange={onChange}
      onCancel={() => resetToModelValue()}
      onSubmit={(_) => onSubmit()}
      submitOnBlur={false}
      isDisabled={isSubmitting}
    />
  )
})
