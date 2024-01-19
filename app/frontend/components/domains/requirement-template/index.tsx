import { Box, Container, Flex, GridItemProps, Heading, Text, VStack } from "@chakra-ui/react"
import { observer } from "mobx-react-lite"
import React, { useEffect } from "react"
import { useTranslation } from "react-i18next"
import { useMst } from "../../../setup/root"
import { Paginator } from "../../shared/base/inputs/paginator"
import { PerPageSelect } from "../../shared/base/inputs/per-page-select"
import { SearchGrid } from "../../shared/grid/search-grid"
import { SearchGridItem } from "../../shared/grid/search-grid-item"
import { RouterLink } from "../../shared/navigation/router-link"
import { RouterLinkButton } from "../../shared/navigation/router-link-button"
import { TemplateStatusTag } from "../../shared/requirement-template/template-status-tag"
import { GridHeaders } from "./grid-header"

const sharedGridItemsStyles: Partial<GridItemProps> = {
  p: 4,
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  role: "cell",
  color: "text.primary",
}

export const RequirementTemplatesScreen = observer(function RequirementTemplate() {
  const { requirementTemplateStore } = useMst()
  const {
    tableRequirementTemplates,
    currentPage,
    totalPages,
    totalCount,
    countPerPage,
    fetchRequirementTemplates,
    handleCountPerPageChange,
    handlePageChange,
  } = requirementTemplateStore
  const { t } = useTranslation()

  useEffect(() => {
    fetchRequirementTemplates()
  }, [])

  return (
    <Container maxW="container.lg" p={8} as="main">
      <VStack alignItems={"flex-start"} spacing={5} w={"full"} h={"full"}>
        <Flex justifyContent={"space-between"} w={"full"} alignItems={"flex-end"} gap={6}>
          <Box>
            <Heading fontSize={"4xl"} color={"text.primary"}>
              {t("requirementTemplate.index.title")}
            </Heading>
            <Text color={"text.secondary"} mt={1}>
              {t("requirementTemplate.index.description")}
            </Text>
          </Box>
          <RouterLinkButton to="#" variant={"primary"} minWidth="fit-content">
            {t("requirementTemplate.index.createButton")}
          </RouterLinkButton>
        </Flex>

        <SearchGrid templateColumns="repeat(3, 1fr) 2fr repeat(3, 1fr)">
          <GridHeaders />
          {tableRequirementTemplates.map((rt) => {
            return (
              <Box key={rt.id} className={"requirements-template-grid-row"} role={"row"} display={"contents"}>
                <SearchGridItem>
                  <TemplateStatusTag requirementTemplate={rt} />
                </SearchGridItem>
                <SearchGridItem fontWeight="bold">{rt.permitType.name}</SearchGridItem>
                <SearchGridItem fontWeight="bold">{rt.activity.name}</SearchGridItem>
                <SearchGridItem>{rt.description}</SearchGridItem>
                <SearchGridItem>{rt.version}</SearchGridItem>
                <SearchGridItem>{rt.jurisdictionsSize}</SearchGridItem>
                <SearchGridItem>
                  <Flex justify="space-between" w="full">
                    <RouterLink to={`${rt.id}/edit`}>{t("ui.edit")}</RouterLink>
                  </Flex>
                </SearchGridItem>
              </Box>
            )
          })}
        </SearchGrid>
        <Flex w={"full"} justifyContent={"space-between"}>
          <PerPageSelect
            handleCountPerPageChange={handleCountPerPageChange}
            countPerPage={countPerPage}
            totalCount={totalCount}
          />
          <Paginator
            current={currentPage}
            total={totalCount}
            totalPages={totalPages}
            pageSize={countPerPage}
            handlePageChange={handlePageChange}
          />
        </Flex>
      </VStack>
    </Container>
  )
})
