import Header from "~/components/Header";

export default function B2CLayout({ children }: HTMLDivElement) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
