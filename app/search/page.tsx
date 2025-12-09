import { getDoctorsAction } from "@/app/actions"
import SearchClient from "./SearchClient"

export const dynamic = 'force-dynamic'

export default async function SearchPage({ searchParams }: { searchParams: Record<string, string | string[] | undefined> }) {
  const doctors = await getDoctorsAction()
  const q = typeof searchParams?.q === "string" ? searchParams.q : ""
  const specialty = typeof searchParams?.specialty === "string" ? searchParams.specialty : ""

  return <SearchClient doctors={doctors} initialQuery={q} initialSpec={specialty} />
}
