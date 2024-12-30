import { redirect } from "next/navigation"

const PackagePage = ({ params }: { params: { packageId: string } }) => {
  redirect(`${params.packageId}/map`)
}

export default PackagePage
