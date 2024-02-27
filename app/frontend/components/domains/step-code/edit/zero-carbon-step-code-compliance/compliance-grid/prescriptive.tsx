import { t } from "i18next"
import React from "react"
import { IStepCodeChecklist } from "../../../../../../models/step-code-checklist"
import { TextFormControl } from "../../../../../shared/form/input-form-control"
import { GridColumnHeader } from "../../shared/compliance-grid/column-header"
import { GridData } from "../../shared/compliance-grid/data"
import { RequirementsMetTag } from "../../shared/compliance-grid/requirements-met-tag"
import { GridRowHeader } from "../../shared/compliance-grid/row-header"
import { translationPrefix } from "../translation-prefix"

interface IProps {
  checklist: IStepCodeChecklist
}

export const Prescriptive = function Prescriptive({ checklist }: IProps) {
  return (
    <>
      <GridColumnHeader colSpan={4}>{t(`${translationPrefix}.prescriptive.title`)}</GridColumnHeader>

      <GridRowHeader>{t(`${translationPrefix}.prescriptive.heating`)}</GridRowHeader>
      <GridData>
        <TextFormControl
          inputProps={{ isDisabled: true, textAlign: "center", value: checklist.prescriptiveHeatingRequirement || "-" }}
        />
      </GridData>
      <GridData>
        <TextFormControl
          inputProps={{ isDisabled: true, textAlign: "center", value: checklist.prescriptiveHeating || "-" }}
        />
      </GridData>

      <GridData rowSpan={3}>
        <RequirementsMetTag success={checklist.prescriptivePassed} />
      </GridData>

      <GridRowHeader>{t(`${translationPrefix}.prescriptive.hotWater`)}</GridRowHeader>
      <GridData>
        <TextFormControl
          inputProps={{
            isDisabled: true,
            textAlign: "center",
            value: checklist.prescriptiveHotWaterRequirement || "-",
          }}
        />
      </GridData>
      <GridData>
        <TextFormControl
          inputProps={{ isDisabled: true, textAlign: "center", value: checklist.prescriptiveHotWater || "-" }}
        />
      </GridData>

      <GridRowHeader>{t(`${translationPrefix}.prescriptive.other`)}</GridRowHeader>
      <GridData>
        <TextFormControl
          inputProps={{ isDisabled: true, textAlign: "center", value: checklist.prescriptiveOtherRequirement || "-" }}
        />
      </GridData>
      <GridData>
        <TextFormControl
          inputProps={{ isDisabled: true, textAlign: "center", value: checklist.prescriptiveOther || "-" }}
        />
      </GridData>
    </>
  )
}
