import { Box, Container, Flex, Heading, Text, VStack } from "@chakra-ui/react"
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
import { GridHeaders } from "./grid-header"

export const JurisdictionIndexScreen = observer(function JurisdictionIndex() {
  const { jurisdictionStore } = useMst()
  const {
    tableJurisdictions,
    currentPage,
    totalPages,
    totalCount,
    countPerPage,
    fetchJurisdictions,
    handleCountPerPageChange,
    handlePageChange,
  } = jurisdictionStore
  const { t } = useTranslation()

  useEffect(() => {
    fetchJurisdictions()
  }, [])

  return (
    <Container maxW="container.lg" p={8} as={"main"}>
      <VStack alignItems={"flex-start"} spacing={5} w={"full"} h={"full"}>
        <Flex justifyContent={"space-between"} w={"full"} alignItems={"flex-end"}>
          <Box>
            <Heading fontSize={"4xl"} color={"text.primary"}>
              {t("jurisdiction.index.title")}
            </Heading>
            <Text color={"text.secondary"} mt={1}>
              {t("jurisdiction.index.description")}
            </Text>
          </Box>
          <RouterLinkButton variant={"primary"} to={"/jurisdictions/new"}>
            {t("jurisdiction.index.createButton")}
          </RouterLinkButton>
        </Flex>

        <SearchGrid templateColumns="3fr repeat(4, 1fr) 2fr">
          <GridHeaders />
          {tableJurisdictions.map((j) => {
            return (
              <Box key={j.id} className={"jurisdiction-index-grid-row"} role={"row"} display={"contents"}>
                <SearchGridItem fontWeight={700}>{j.reverseQualifiedName}</SearchGridItem>
                <SearchGridItem>{j.reviewManagersSize}</SearchGridItem>
                <SearchGridItem>{j.reviewersSize}</SearchGridItem>
                <SearchGridItem>{j.permitApplicationsSize}</SearchGridItem>
                <SearchGridItem>todo</SearchGridItem>
                <SearchGridItem>
                  <Flex justify="space-between" w="full">
                    <RouterLink to={`${j.id}/invite`}>{t("user.invite")}</RouterLink>
                    <RouterLink to={"#"}>{t("jurisdiction.viewAs")}</RouterLink>
                    <RouterLink to={`${j.id}`}>{t("ui.manage")}</RouterLink>
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
