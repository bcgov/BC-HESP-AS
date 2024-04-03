import { Text, View } from "@react-pdf/renderer"
import { t } from "i18next"
import * as R from "ramda"
import React, { useContext } from "react"
import { theme } from "../../../../../../styles/theme"
import { i18nPrefix } from "../../energy-performance-compliance/i18n-prefix"
import { CheckBox } from "../shared/check-box"
import { Divider } from "../shared/divider"
import { Field } from "../shared/field"
import { HStack } from "../shared/h-stack"
import { StepCodeChecklistContext } from "../step-code-checklist-context"
import { styles } from "../styles"

export const EnergyPerformanceCompliance = function StepCodeChecklistPDFEnergyPerformanceCompliance() {
  const { checklist } = useContext(StepCodeChecklistContext)

  return (
    <View style={styles.panelContainer} break>
      <View style={styles.panelHeader}>
        <Text style={styles.panelHeaderText}>{t(`${i18nPrefix}.heading`)}</Text>
      </View>
      <View style={styles.panelBody}>
        <Text style={{ fontSize: 12, fontWeight: 700 }}>{t(`${i18nPrefix}.proposedHouseEnergyConsumption`)}</Text>

        <HStack style={{ width: "100%" }}>
          <Field
            value={checklist.hvacConsumption}
            hint={t(`${i18nPrefix}.energyUnit`)}
            label={t(`${i18nPrefix}.hvac`)}
          />
          <Text style={{ fontWeight: 700, fontSize: 18, marginRight: 6 }}>+</Text>
          <Field
            label={t(`${i18nPrefix}.dwhHeating`)}
            value={checklist.dhwHeatingConsumption}
            hint={t(`${i18nPrefix}.energyUnit`)}
          />
          <Text style={{ fontWeight: 700, fontSize: 18, marginRight: 6 }}>=</Text>
          <Field
            label={t(`${i18nPrefix}.sum`)}
            value={R.sum([
              parseInt(checklist.dhwHeatingConsumption || "0"),
              parseInt(checklist.hvacConsumption || "0"),
            ])}
            hint={t(`${i18nPrefix}.energyUnit`)}
          />
        </HStack>

        <Divider />

        <Field
          label={t(`${i18nPrefix}.calculationAirtightness`)}
          value={t(`${i18nPrefix}.airtightnessValue.options.${checklist.epcCalculationAirtightness}`)}
        />
        <HStack style={{ width: "100%", alignItems: "flex-end" }}>
          <Field label={t(`${i18nPrefix}.calculationTestingTarget`)} value={checklist.ach} />
          <Field value={t(`${i18nPrefix}.epcTestingTargetType.options.${checklist.epcCalculationTestingTargetType}`)} />
        </HStack>
        <HStack style={{ width: "100%", gap: 3.5 }}>
          <CheckBox isChecked={checklist.epcCalculationCompliance} />
          <Text style={{ fontSize: 10.5, color: theme.colors.text.primary }}>{t(`${i18nPrefix}.compliance`)}</Text>
        </HStack>
      </View>
    </View>
  )
}
