import {
  Button,
  ButtonGroup,
  ButtonProps,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalContentProps,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalProps,
  useDisclosure,
} from "@chakra-ui/react"
import { observer } from "mobx-react-lite"
import React from "react"
import { useTranslation } from "react-i18next"

export interface IConfirmationModalProps {
  triggerButtonProps?: Partial<ButtonProps>
  triggerText?: string
  renderTriggerButton?: (props: ButtonProps) => JSX.Element
  title?: string
  body?: string
  onConfirm?: (closeModal: () => void) => void | Promise<void>
  modalProps?: Partial<ModalProps>
  modalContentProps?: Partial<ModalContentProps>
}

export const ConfirmationModal = observer(function ConfirmationModal({
  triggerButtonProps,
  renderTriggerButton,
  triggerText,
  title,
  body,
  onConfirm,
  modalProps,
  modalContentProps,
}: IConfirmationModalProps) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { t } = useTranslation()

  return (
    <>
      {renderTriggerButton ? (
        renderTriggerButton({ onClick: onOpen })
      ) : (
        <Button variant={"ghost"} color={"text.link"} onClick={onOpen} {...triggerButtonProps}>
          {triggerText ?? t("ui.confirm")}
        </Button>
      )}
      <Modal isOpen={isOpen} onClose={onClose} {...modalProps}>
        <ModalOverlay />
        <ModalContent {...modalContentProps}>
          {title && (
            <ModalHeader fontSize={"2xl"} mt={2}>
              {title}
            </ModalHeader>
          )}
          <ModalCloseButton />
          {body && <ModalBody>{body}</ModalBody>}

          <ModalFooter justifyContent={"flex-start"}>
            <ButtonGroup spacing={4}>
              <Button variant={"primary"} onClick={() => onConfirm(onClose)}>
                {triggerText ?? t("ui.confirm")}
              </Button>
              <Button variant={"secondary"} onClick={onClose}>
                {t("ui.neverMind")}
              </Button>
            </ButtonGroup>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
})
