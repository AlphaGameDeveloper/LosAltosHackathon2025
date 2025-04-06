import { cookies } from "next/headers"
import Image from "next/image"
import { redirect } from "next/navigation"

import { Mail } from "@/components/mail"
import { accounts, mails } from './data'

export default function MailPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  if (!searchParams.fromLogin) {
    redirect('/login')
  }

  const layout = cookies().get("react-resizable-panels:layout:mail")
  const defaultLayout = layout ? JSON.parse(layout.value) : undefined

  return (
    <>
      <div className="md:hidden">
        <Image
          src="/examples/mail-dark.png"
          width={1280}
          height={727}
          alt="Mail"
          className="hidden dark:block"
        />
        <Image
          src="/examples/mail-light.png"
          width={1280}
          height={727}
          alt="Mail"
          className="block dark:hidden"
        />
      </div>
      <div className="hidden flex-col md:flex">
        <Mail
          accounts={accounts}
          mails={mails}
          defaultLayout={defaultLayout}
        />
      </div>
    </>
  )
}