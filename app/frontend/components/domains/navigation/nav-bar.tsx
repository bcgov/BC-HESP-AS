import {
  Box,
  Button,
  Container,
  Divider,
  Flex,
  HStack,
  Heading,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Portal,
  Show,
  Spacer,
  Text,
} from "@chakra-ui/react"
import { List, MagnifyingGlass } from "@phosphor-icons/react"
import { observer } from "mobx-react-lite"
import * as R from "ramda"
import React from "react"
import { useTranslation } from "react-i18next"
import { useLocation, useNavigate } from "react-router-dom"
import { useMst } from "../../../setup/root"
import { EUserRoles } from "../../../types/enums"
import { RouterLink } from "../../shared/navigation/router-link"
import { StepCodeNavLinks } from "../step-code/nav-links"
import { SubNavBar } from "./sub-nav-bar"

function isTemplateEditPath(path: string): boolean {
  const regex = /^\/requirement-templates\/([a-f\d-]+)\/edit$/

  return regex.test(path)
}

function isDigitalPermitEditPath(path: string): boolean {
  const regex = /^\/digital-building-permits\/([a-f\d-]+)\/edit$/

  return regex.test(path)
}

function isTemplateVersionPath(path: string): boolean {
  const regex = /^\/template-versions\/([a-f\d-]+)$/
  return regex.test(path)
}

function isPermitApplicationPath(path: string): boolean {
  const regex = /^\/permit-applications\/([a-f\d-]+)/
  return regex.test(path)
}

function isPermitApplicationEditPath(path: string): boolean {
  const regex = /^\/permit-applications\/([a-f\d-]+)\/edit.*$/
  return regex.test(path)
}

function shouldHideSubNavbarForPath(path: string): boolean {
  const matchers: Array<(path: string) => boolean> = [
    (path) => path === "/",
    isTemplateEditPath,
    isTemplateVersionPath,
    isPermitApplicationEditPath,
    isPermitApplicationPath,
    isDigitalPermitEditPath,
  ]

  return matchers.some((matcher) => matcher(path))
}

export const NavBar = observer(() => {
  const { t } = useTranslation()
  const { sessionStore, userStore } = useMst()

  const { currentUser } = userStore

  const { loggedIn } = sessionStore

  const location = useLocation()
  const path = location.pathname

  const isStepCode = R.test(/step-code/, path)

  return (
    <>
      <Box
        as="nav"
        id="mainNav"
        position="sticky"
        top={0}
        w="full"
        bg={currentUser?.isAdmin ? "theme.blue" : "greys.white"}
        color={currentUser?.isAdmin ? "greys.white" : "theme.blue"}
        zIndex={10}
        borderBottomWidth={2}
        borderColor="border.light"
        shadow="elevations.elevation01"
      >
        <Container maxW="container.lg">
          <Flex align="center" gap={2}>
            <RouterLink to="/">
              <Image
                alt={t("site.linkHome")}
                src={currentUser?.isAdmin ? "/images/logo-light.svg" : "/images/logo.svg"}
              />
            </RouterLink>
            <Show above="md">
              {isStepCode ? (
                <Heading as="h3" fontSize="md" color="text.primary" fontWeight="bold">
                  {t("stepCode.title")}
                </Heading>
              ) : (
                <Heading as="h3" fontSize="2xl" fontWeight="normal">
                  {currentUser?.isAdmin ? t("site.adminNavBarTitle") : t("site.title")}
                </Heading>
              )}
              <Text fontSize="sm" textTransform="uppercase" color="theme.yellow" fontWeight="bold" mb={2} ml={1}>
                {t("site.beta")}
              </Text>
            </Show>
            <Spacer />
            <HStack gap={3}>
              {!isStepCode && currentUser?.isSubmitter && <NavBarSearch />}
              {currentUser?.jurisdiction && <Text color="greys.white">{currentUser.jurisdiction.name}</Text>}
              {currentUser?.isReviewer ||
                currentUser?.isReviewManager ||
                (currentUser?.isSuperAdmin && (
                  <Text color="greys.white" textTransform="capitalize">
                    {t(`user.roles.${currentUser.role as EUserRoles}`)}
                  </Text>
                ))}
              {!isStepCode && <NavBarMenu isAdmin={currentUser?.isAdmin} />}
              {isStepCode && <StepCodeNavLinks />}
            </HStack>
          </Flex>
        </Container>
      </Box>
      {!shouldHideSubNavbarForPath(path) && loggedIn && <SubNavBar />}
    </>
  )
})

const NavBarSearch = () => {
  const { t } = useTranslation()

  return (
    <Button variant="tertiary" rightIcon={<MagnifyingGlass size={16} />}>
      {t("ui.search")}
    </Button>
  )
}

interface INavBarMenuProps {
  isAdmin: boolean
}

const NavBarMenu = observer(({ isAdmin }: INavBarMenuProps) => {
  const { t } = useTranslation()
  const { sessionStore, userStore } = useMst()
  const { currentUser } = userStore
  const { logout, loggedIn } = sessionStore

  const handleClickLogout = async () => {
    await logout()
    // Do a full browser refresh to slightly enhance security
    window.location.href = "/"
  }

  const superAdminOnlyItems = (
    <>
      <NavMenuItem label={t("home.jurisdictionsTitle")} to={"/jurisdictions"} />
      <NavMenuItem label={t("home.permitTemplateCatalogueTitle")} to={"/requirement-templates"} />
      <NavMenuItem label={t("home.requirementsLibraryTitle")} to={"/requirements-library"} />
      <NavMenuItem label={t("home.auditLogTitle")} to={"/audit-log"} />
    </>
  )

  const adminOrManagerItems = <></>

  const submitterOnlyItems = <></>

  return (
    <Menu>
      <MenuButton
        as={Button}
        borderRadius="lg"
        border={isAdmin ? "solid white" : "solid black"}
        borderWidth="1px"
        p={3}
        variant={isAdmin ? "primary" : "primaryInverse"}
        aria-label="menu dropdown button"
        leftIcon={<List size={16} weight="bold" color={isAdmin ? "white" : "black"} />}
      >
        {t("site.menu")}
      </MenuButton>
      <Portal>
        <MenuList zIndex={10}>
          {loggedIn ? (
            <>
              <NavMenuItem label={t("site.home")} to={"/"} />
              {currentUser?.isSuperAdmin && superAdminOnlyItems}
              {(currentUser?.isSuperAdmin || currentUser?.isReviewManager) && adminOrManagerItems}
              {currentUser?.isSubmitter && submitterOnlyItems}
              <Divider borderWidth="1px" />
              <NavMenuItem label={t("user.myProfile")} to={"/profile"} />
              <NavMenuItem label={t("auth.logout")} onClick={handleClickLogout} />
            </>
          ) : (
            <NavMenuItem label={t("auth.login")} to="/login" />
          )}
        </MenuList>
      </Portal>
    </Menu>
  )
})

// Looks complicated but this is jsut how you make it so that either to or onClick must be given, but not necessarily both
interface INavMenuItemProps {
  label: string
  to?: string
  onClick?: (any) => void
}

const NavMenuItem = ({ label, to, onClick }: INavMenuItemProps) => {
  const navigate = useNavigate()

  const handleClick = (e) => {
    navigate(to)
    onClick && onClick(e)
  }

  return (
    <MenuItem as={Button} color="text.primary" variant="tertiary" onClick={handleClick}>
      <Text textAlign="left" w="full">
        {label}
      </Text>
    </MenuItem>
  )
}
