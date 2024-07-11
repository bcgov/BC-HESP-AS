import { Box, Flex, FlexProps, Heading, Text, ToastProps } from "@chakra-ui/react"
import { CheckCircle, Info, Warning, WarningCircle } from "@phosphor-icons/react"
import React from "react"

interface ICustomMessageBoxProps extends Omit<ToastProps, "id" | "position" | "title">, FlexProps {
  children?: React.ReactNode
}

const iconMap = {
  success: <CheckCircle size={24} aria-label={"success icon"} />,
  warning: <Warning size={24} aria-label={"warning icon"} />,
  error: <WarningCircle size={24} aria-label={"error icon"} />,
  info: <Info size={24} aria-label={"info icon"} />,
}

export const CustomMessageBox = ({ title, description, status, children, ...rest }: ICustomMessageBoxProps) => {
  return (
    <Flex
      direction="column"
      gap={2}
      bg={`semantic.${status}Light`}
      border="1px solid"
      borderRadius="lg"
      borderColor={`semantic.${status}`}
      p={4}
      {...rest}
    >
      <Flex align="flex-start" gap={2} whiteSpace={"normal"}>
        <Box color={`semantic.${status}`}>{iconMap[status]}</Box>
        <Flex direction="column" gap={2}>
          {title && (
            <Heading as="h3" fontSize="md">
              {title}
            </Heading>
          )}
          {description && <Text wordBreak={"break-word"}>{description}</Text>}
          {children}
        </Flex>
      </Flex>
    </Flex>
  )
}
