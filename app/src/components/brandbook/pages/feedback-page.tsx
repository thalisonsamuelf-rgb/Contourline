"use client"

import { useState } from "react"
import { BbCompPageTemplate } from "../templates"
import { BbCompGrid } from "../organisms"
import { BbCompCell } from "../molecules"
import { BbAlert, BbToast, BbEmptyState, BbLoadingOverlay } from "../molecules"
import { BbModal, BbNotificationCenter, BbConfirmSheet } from "../organisms"
import { BbButton, BbSpinner } from "../atoms"
import {
  STARTER_BRAND_ASSETS,
  STARTER_PAGE_CHROME,
  STARTER_REFERENCE_TIMESTAMP,
} from "@/components/brandbook/data/starter-brand-data"
import type { BbNotification } from "../organisms/bb-notification-center"

const now = STARTER_REFERENCE_TIMESTAMP

const demoNotifications: BbNotification[] = [
  { id: "1", title: "Deploy concluído", description: "O deploy da v2.4.1 foi finalizado com sucesso.", timestamp: now - 120_000, read: false, type: "success" },
  { id: "2", title: "Erro no pipeline", description: "O build falhou no step de typecheck.", timestamp: now - 3_600_000, read: false, type: "error" },
  { id: "3", title: "Nova versão disponível", description: `${STARTER_BRAND_ASSETS.brandShortName} framework v1.1 está disponível.`, timestamp: now - 7_200_000, read: true, type: "info" },
  { id: "4", title: "Limite de uso", description: "80% do limite de tokens atingido.", timestamp: now - 86_400_000, read: true, type: "warning" },
]

export function FeedbackPage() {
  const chrome = STARTER_PAGE_CHROME.feedback
  const [modalOpen, setModalOpen] = useState(false)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [confirmDestructiveOpen, setConfirmDestructiveOpen] = useState(false)
  const [confirmLoadingOpen, setConfirmLoadingOpen] = useState(false)
  const [notifications, setNotifications] = useState(demoNotifications)
  const [overlayLoading, setOverlayLoading] = useState(false)

  return (
    <>
      <BbCompPageTemplate
        header={{
          ...chrome,
          titlePrefix: "Feedback",
          titleHighlight: "Library",
        }}
        sections={[
          /* ── Alerts ── */
          {
            label: "Alerts",
            content: (
              <BbCompGrid columns={2}>
                <BbCompCell
                  name="Info"
                  preview={
                    <BbAlert variant="info" title="Information">
                      Informational alert message.
                    </BbAlert>
                  }
                />
                <BbCompCell
                  name="Success"
                  preview={
                    <BbAlert variant="success" title="Success">
                      Operation completed successfully.
                    </BbAlert>
                  }
                />
                <BbCompCell
                  name="Warning"
                  preview={
                    <BbAlert variant="warning" title="Warning">
                      Please review before proceeding.
                    </BbAlert>
                  }
                />
                <BbCompCell
                  name="Error"
                  preview={
                    <BbAlert variant="error" title="Error">
                      Something went wrong.
                    </BbAlert>
                  }
                />
              </BbCompGrid>
            ),
          },

          /* ── Toasts ── */
          {
            label: "Toasts",
            content: (
              <BbCompGrid columns={2}>
                <BbCompCell name="Success" preview={<BbToast variant="success" message="Changes saved" duration={0} />} />
                <BbCompCell name="Error" preview={<BbToast variant="error" message="Connection failed" duration={0} />} />
                <BbCompCell name="Warning" preview={<BbToast variant="warning" message="Storage 92% full" duration={0} />} />
                <BbCompCell name="Info" preview={<BbToast variant="info" message="Update available" duration={0} />} />
              </BbCompGrid>
            ),
          },

          /* ── Modal ── */
          {
            label: "Modal",
            content: (
              <BbCompGrid columns={1}>
                <BbCompCell
                  name="Dialog Modal"
                  preview={
                    <BbButton onClick={() => setModalOpen(true)}>Open Modal</BbButton>
                  }
                />
              </BbCompGrid>
            ),
          },

          /* ── Notification Center ── */
          {
            label: "Notification Center",
            content: (
              <BbCompGrid columns={1}>
                <BbCompCell
                  name={`Notifications (${notifications.filter((n) => !n.read).length} unread)`}
                  preview={
                    <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
                      <BbNotificationCenter
                        notifications={notifications}
                        referenceNow={STARTER_REFERENCE_TIMESTAMP}
                        onMarkRead={(id) =>
                          setNotifications((prev) =>
                            prev.map((n) => (n.id === id ? { ...n, read: true } : n))
                          )
                        }
                        onDismiss={(id) =>
                          setNotifications((prev) => prev.filter((n) => n.id !== id))
                        }
                        onMarkAllRead={() =>
                          setNotifications((prev) =>
                            prev.map((n) => ({ ...n, read: true }))
                          )
                        }
                        settingsHref="#"
                      />
                      <span
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.55rem",
                          color: "var(--dim)",
                          textTransform: "uppercase",
                          letterSpacing: "0.08em",
                        }}
                      >
                        Clique no sino para abrir
                      </span>
                    </div>
                  }
                />
              </BbCompGrid>
            ),
          },

          /* ── Empty States ── */
          {
            label: "Empty States",
            content: (
              <BbCompGrid columns={2}>
                <BbCompCell
                  name="Default"
                  preview={
                    <BbEmptyState
                      variant="default"
                      title="Nenhum item"
                      description="Não há itens para exibir."
                      action={{ label: "Criar item", onClick: () => {} }}
                    />
                  }
                />
                <BbCompCell
                  name="Search"
                  preview={
                    <BbEmptyState
                      variant="search"
                      title="Sem resultados"
                      description="Tente termos diferentes."
                      action={{ label: "Limpar busca", onClick: () => {} }}
                    />
                  }
                />
                <BbCompCell
                  name="Error"
                  preview={
                    <BbEmptyState
                      variant="error"
                      title="Algo deu errado"
                      description="Erro inesperado."
                      action={{ label: "Tentar novamente", onClick: () => {} }}
                    />
                  }
                />
                <BbCompCell
                  name="Permissions"
                  preview={
                    <BbEmptyState
                      variant="permissions"
                      title="Acesso restrito"
                      description="Solicite acesso ao admin."
                    />
                  }
                />
              </BbCompGrid>
            ),
          },

          /* ── Loading Overlay ── */
          {
            label: "Loading Overlay",
            content: (
              <BbCompGrid columns={2}>
                <BbCompCell
                  name="Container Overlay"
                  preview={
                    <div style={{ width: "100%" }}>
                      <BbButton
                        size="sm"
                        onClick={() => {
                          setOverlayLoading(true)
                          setTimeout(() => setOverlayLoading(false), 3000)
                        }}
                        style={{ marginBottom: "0.75rem" }}
                      >
                        Ativar (3s)
                      </BbButton>
                      <BbLoadingOverlay loading={overlayLoading} message="Processando...">
                        <div
                          style={{
                            height: "80px",
                            border: "1px solid var(--border)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontFamily: "var(--font-mono)",
                            fontSize: "0.5rem",
                            color: "var(--dim)",
                            textTransform: "uppercase",
                            letterSpacing: "0.08em",
                          }}
                        >
                          Conteúdo sob overlay
                        </div>
                      </BbLoadingOverlay>
                    </div>
                  }
                />
                <BbCompCell
                  name="Spinner Sizes"
                  preview={
                    <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}>
                        <BbSpinner size="sm" />
                        <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.5rem", color: "var(--dim)", textTransform: "uppercase" }}>SM</span>
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}>
                        <BbSpinner size="md" />
                        <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.5rem", color: "var(--dim)", textTransform: "uppercase" }}>MD</span>
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}>
                        <BbSpinner size="lg" />
                        <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.5rem", color: "var(--dim)", textTransform: "uppercase" }}>LG</span>
                      </div>
                    </div>
                  }
                />
              </BbCompGrid>
            ),
          },

          /* ── Confirm Sheet ── */
          {
            label: "Confirm Sheet",
            content: (
              <BbCompGrid columns={3}>
                <BbCompCell
                  name="Default"
                  preview={<BbButton size="sm" onClick={() => setConfirmOpen(true)}>Abrir Default</BbButton>}
                />
                <BbCompCell
                  name="Destructive"
                  preview={<BbButton size="sm" onClick={() => setConfirmDestructiveOpen(true)}>Abrir Destructive</BbButton>}
                />
                <BbCompCell
                  name="Loading"
                  preview={<BbButton size="sm" onClick={() => setConfirmLoadingOpen(true)}>Abrir Loading</BbButton>}
                />
              </BbCompGrid>
            ),
          },
        ]}
      />

      {/* ── Dialogs (rendered outside template) ── */}
      <BbModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Confirm Action"
        footer={
          <>
            <BbButton variant="ghost" onClick={() => setModalOpen(false)}>Cancel</BbButton>
            <BbButton variant="primary" onClick={() => setModalOpen(false)}>Confirm</BbButton>
          </>
        }
      >
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.675rem", color: "var(--dim)", margin: 0 }}>
          Are you sure you want to proceed with this action? This cannot be undone.
        </p>
      </BbModal>

      <BbConfirmSheet
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        title="Confirmar ação"
        description="Deseja prosseguir com esta operação? Esta ação pode ser desfeita."
        confirmLabel="Confirmar"
        cancelLabel="Cancelar"
        onConfirm={() => setConfirmOpen(false)}
        onCancel={() => setConfirmOpen(false)}
      />

      <BbConfirmSheet
        open={confirmDestructiveOpen}
        onClose={() => setConfirmDestructiveOpen(false)}
        title="Excluir item"
        description="Tem certeza que deseja excluir? Esta ação não pode ser desfeita."
        confirmLabel="Excluir"
        cancelLabel="Cancelar"
        variant="destructive"
        onConfirm={() => setConfirmDestructiveOpen(false)}
        onCancel={() => setConfirmDestructiveOpen(false)}
      />

      <BbConfirmSheet
        open={confirmLoadingOpen}
        onClose={() => {
          setConfirmLoadingOpen(false)
        }}
        title="Processando"
        description="Aguarde enquanto a operação é processada."
        confirmLabel="Processando..."
        cancelLabel="Cancelar"
        loading
        onConfirm={() => {}}
        onCancel={() => setConfirmLoadingOpen(false)}
      />
    </>
  )
}
