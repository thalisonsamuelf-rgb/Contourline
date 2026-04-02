"use client"

import * as React from "react"
import { BbCompPageTemplate } from "../templates"
import { BbInlineEdit, BbArrayInput, BbMultiLanguageInput, BbFileInput, BbPhoneInput } from "../molecules"
import { BbInput, BbTextarea, BbSelect, BbCheckbox, BbRadio, BbSwitch, BbButton, BbHint } from "../atoms"
import { BbCompCell } from "../molecules"
import { BbCompGrid, BbDateRangePicker, BbRichTextEditor } from "../organisms"
import { STARTER_PAGE_CHROME } from "@/components/brandbook/data/starter-brand-data"
import { Field, FieldLabel, fieldControlVariants } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { SegmentedControl } from "@/components/ui/segmented-control"
import { Textarea } from "@/components/ui/textarea"
import type { DateRange } from "react-day-picker"

function ProductionFieldPreview() {
  return (
    <div style={{ width: "100%", maxWidth: 320 }}>
      <Field>
        <FieldLabel htmlFor="bb-production-name">Name</FieldLabel>
        <Input
          id="bb-production-name"
          placeholder="Jane Smith"
          className={fieldControlVariants({ tone: "surface" })}
        />
      </Field>
    </div>
  )
}

function ProductionSegmentedPreview() {
  const [budget, setBudget] = React.useState("$10k – $25k")

  return (
    <div style={{ width: "100%", maxWidth: 360 }}>
      <Field spacing="relaxed">
        <span
          id="bb-production-budget"
          className="flex min-h-11 items-center font-mono text-[11px] font-bold uppercase tracking-wider text-gray-silver"
        >
          Budget
        </span>
        <SegmentedControl
          options={["Under $10k", "$10k – $25k", "$25k+" ]}
          value={budget}
          onValueChange={setBudget}
          className="flex flex-wrap gap-2"
          aria-labelledby="bb-production-budget"
        />
      </Field>
    </div>
  )
}

function ProductionTextareaPreview() {
  return (
    <div style={{ width: "100%", maxWidth: 320 }}>
      <Field>
        <FieldLabel htmlFor="bb-production-message">Message</FieldLabel>
        <Textarea
          id="bb-production-message"
          rows={3}
          placeholder="Tell us what you need..."
          className={fieldControlVariants({ tone: "surface" })}
        />
      </Field>
    </div>
  )
}

function DateRangePickerPreview() {
  const [range, setRange] = React.useState<DateRange | undefined>()
  return <BbDateRangePicker value={range} onChange={setRange} />
}

function PhoneInputPreview() {
  const [value, setValue] = React.useState<import("react-phone-number-input").Value | undefined>()
  return <div className="max-w-xs"><BbPhoneInput value={value} onChange={setValue} /></div>
}

function FileInputPreview() {
  return <BbFileInput accept="image/*" preview multiple onUpload={(files) => console.log(files)} />
}

function InlineEditPreview() {
  const [val, setVal] = React.useState("Click to edit me")
  return <BbInlineEdit value={val} onSave={setVal} />
}

function MultiLanguagePreview() {
  const [val, setVal] = React.useState<Record<string, string>>({ pt: "Olá mundo", en: "" })
  return (
    <BbMultiLanguageInput
      value={val}
      onChange={setVal}
      languages={[
        { code: "pt", label: "PT", flag: "🇧🇷" },
        { code: "en", label: "EN", flag: "🇺🇸" },
      ]}
    />
  )
}

function ArrayInputPreview() {
  const [items, setItems] = React.useState(["React", "TypeScript"])
  return <BbArrayInput value={items} onChange={setItems} maxItems={5} placeholder="Add tech..." />
}

function RichTextEditorMinimalPreview() {
  const [val, setVal] = React.useState("")
  return <BbRichTextEditor value={val} onChange={setVal} toolbar={["bold", "italic", "bulletList"]} placeholder="Minimal toolbar..." />
}

function RichTextEditorFullPreview() {
  const [val, setVal] = React.useState("")
  return <BbRichTextEditor value={val} onChange={setVal} toolbar={["bold", "italic", "underline", "h1", "h2", "h3", "bulletList", "orderedList", "link", "image", "codeBlock"]} placeholder="Full toolbar..." />
}

function RichTextEditorReadOnlyPreview() {
  return <BbRichTextEditor value="<h2>Read-Only</h2><p>Content cannot be edited.</p>" onChange={() => {}} readOnly />
}

interface BrandbookFieldProps {
  label?: string
  hint?: string
  error?: string
  required?: boolean
  htmlFor?: string
  children: React.ReactNode
}

function BrandbookField({ label, hint, error, required, htmlFor, children }: BrandbookFieldProps) {
  return (
    <Field spacing="none">
      {label ? (
        <FieldLabel
          htmlFor={htmlFor}
          className="min-h-0"
          style={{
            display: "block",
            minHeight: 0,
            marginBottom: "0.375rem",
            fontFamily: "var(--font-mono)",
            fontSize: "0.625rem",
            fontWeight: 500,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            color: "var(--dim)",
          }}
        >
          {label}
          {required ? (
            <span aria-hidden="true" style={{ color: "var(--error)", marginLeft: "0.25rem" }}>
              *
            </span>
          ) : null}
        </FieldLabel>
      ) : null}
      {children}
      {error ? <BbHint variant="error">{error}</BbHint> : null}
      {!error && hint ? <BbHint>{hint}</BbHint> : null}
    </Field>
  )
}

export function FormsPage() {
  const chrome = STARTER_PAGE_CHROME.forms

  return (
    <BbCompPageTemplate
      header={{
        ...chrome,
        titlePrefix: "Form",
        titleHighlight: "Library",
      }}
      sections={[
        {
          label: "Advanced Form Components",
          content: (
            <BbCompGrid columns={3}>
              <BbCompCell name="BbDateRangePicker" status="stable" preview={<DateRangePickerPreview />} />
              <BbCompCell name="BbPhoneInput" status="stable" preview={<PhoneInputPreview />} />
              <BbCompCell name="BbFileInput" status="stable" preview={<FileInputPreview />} />
              <BbCompCell name="BbInlineEdit" status="stable" preview={<InlineEditPreview />} />
              <BbCompCell name="BbMultiLanguageInput" status="stable" preview={<MultiLanguagePreview />} />
              <BbCompCell name="BbArrayInput" status="stable" preview={<ArrayInputPreview />} />
            </BbCompGrid>
          ),
        },
        {
          label: "Rich Text Editor",
          content: (
            <BbCompGrid columns={3}>
              <BbCompCell name="Minimal Toolbar" status="stable" preview={<RichTextEditorMinimalPreview />} />
              <BbCompCell name="Full Toolbar" status="stable" preview={<RichTextEditorFullPreview />} />
              <BbCompCell name="Read-Only" status="stable" preview={<RichTextEditorReadOnlyPreview />} />
            </BbCompGrid>
          ),
        },
        {
          label: "Production Roles",
          content: (
            <BbCompGrid columns={3}>
              <BbCompCell name="Field" status="stable" preview={<ProductionFieldPreview />} />
              <BbCompCell
                name="SegmentedControl"
                status="stable"
                preview={<ProductionSegmentedPreview />}
              />
              <BbCompCell
                name="Textarea Field"
                status="stable"
                preview={<ProductionTextareaPreview />}
              />
            </BbCompGrid>
          ),
        },
        {
          label: "Legacy Compatibility",
          content: (
            <BbCompGrid columns={1}>
              <BbCompCell
                name="BbFormField migration"
                status="deprecated"
                preview={
                  <div style={{ width: "100%", maxWidth: 320 }}>
                    <BrandbookField
                      label="Legacy Field"
                      hint="Deprecated source remains for one cycle. New docs use Field + FieldLabel."
                      htmlFor="legacy-field"
                    >
                      <BbInput id="legacy-field" placeholder="Legacy composition" />
                    </BrandbookField>
                  </div>
                }
              />
            </BbCompGrid>
          ),
        },
        {
          label: "Usage Guidance",
          content: (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1px", background: "var(--border)" }}>
              {[
                ["Field", "Canonical wrapper for new site and product form composition."],
                ["FieldLabel", "Canonical label companion for Input, Textarea and grouped controls."],
                ["SegmentedControl", "Canonical pill selector for compact single-choice marketing forms."],
                ["BbFormField", "Deprecated wrapper retained in source only for one cycle. New docs use Field + FieldLabel."],
              ].map(([title, copy]) => (
                <div key={title} style={{ padding: "1.25rem", background: "var(--surface)" }}>
                  <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.625rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--bb-accent)", marginBottom: "0.75rem" }}>
                    {title}
                  </p>
                  <p style={{ fontSize: "0.875rem", lineHeight: 1.6, color: "var(--gray-silver)", margin: 0 }}>
                    {copy}
                  </p>
                </div>
              ))}
            </div>
          ),
        },
        {
          label: "Text Inputs",
          content: (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem", padding: "1.5rem" }}>
              <BrandbookField label="Full Name" hint="As it appears on your ID" htmlFor="name">
                <BbInput id="name" placeholder="John Doe" />
              </BrandbookField>
              <BrandbookField label="Email" hint="We will send a confirmation" htmlFor="email">
                <BbInput id="email" type="email" placeholder="john@example.com" />
              </BrandbookField>
              <BrandbookField label="Password" error="Minimum 8 characters required" htmlFor="password">
                <BbInput id="password" type="password" error placeholder="••••••••" />
              </BrandbookField>
              <BrandbookField label="Disabled Input" htmlFor="disabled">
                <BbInput id="disabled" disabled placeholder="Cannot edit" />
              </BrandbookField>
            </div>
          ),
        },
        {
          label: "Textarea",
          content: (
            <div style={{ maxWidth: 480, padding: "1.5rem" }}>
              <BrandbookField label="Message" hint="Max 500 characters" htmlFor="msg">
                <BbTextarea id="msg" placeholder="Write your message..." />
              </BrandbookField>
            </div>
          ),
        },
        {
          label: "Select",
          content: (
            <div style={{ maxWidth: 320, padding: "1.5rem" }}>
              <BrandbookField label="Role" htmlFor="role">
                <BbSelect id="role">
                  <option value="">Select a role...</option>
                  <option value="admin">Admin</option>
                  <option value="editor">Editor</option>
                  <option value="viewer">Viewer</option>
                </BbSelect>
              </BrandbookField>
            </div>
          ),
        },
        {
          label: "Toggles",
          content: (
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem", padding: "1.5rem" }}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "2rem" }}>
                <BbCheckbox label="Accept terms" />
                <BbCheckbox label="Subscribe to newsletter" />
                <BbCheckbox label="Disabled" disabled />
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "2rem" }}>
                <BbRadio label="Option A" name="demo-radio" />
                <BbRadio label="Option B" name="demo-radio" />
                <BbRadio label="Option C" name="demo-radio" disabled />
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
                <BbSwitch />
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.675rem", color: "var(--dim)" }}>Enable notifications</span>
              </div>
            </div>
          ),
        },
        {
          label: "Composed Form",
          content: (
            <div style={{ maxWidth: 480, padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
              <BrandbookField label="Project Name" required htmlFor="proj">
                <BbInput id="proj" placeholder="My Project" />
              </BrandbookField>
              <BrandbookField label="Description" htmlFor="desc">
                <BbTextarea id="desc" placeholder="Describe the project..." />
              </BrandbookField>
              <BrandbookField label="Priority" htmlFor="prio">
                <BbSelect id="prio">
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </BbSelect>
              </BrandbookField>
              <BbCheckbox label="Mark as urgent" />
              <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem" }}>
                <BbButton variant="primary">Create Project</BbButton>
                <BbButton variant="ghost">Cancel</BbButton>
              </div>
            </div>
          ),
        },
      ]}
    />
  )
}
