import Navbar from "~/components/Navbar";

export default function B2CLayout({ children }: HTMLDivElement) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
