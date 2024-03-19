import { t } from "i18next"
import React from "react"
import { IStepCodeChecklist } from "../../../../../../models/step-code-checklist"
import { TextFormControl } from "../../../../../shared/form/input-form-control"
import { GridData } from "../../shared/grid/data"
import { GridPlaceholder } from "../../shared/grid/placeholder"
import { GridRowHeader } from "../../shared/grid/row-header"
import { translationPrefix } from "../translation-prefix"

interface IProps {
  checklist: IStepCodeChecklist
}

export const ZeroCarbonStep = function ZeroCarbonStep({ checklist }: IProps) {
  return (
    <>
      <GridRowHeader>{t(`${translationPrefix}.step`)}</GridRowHeader>
      <GridData>
        <TextFormControl
          inputProps={{ isDisabled: true, textAlign: "center", value: checklist.requiredZeroCarbonStep }}
        />
      </GridData>
      <GridPlaceholder colSpan={2} />
    </>
  )
}
