import PriceTable from "@/components/price-tabel";
import Image from "next/image";

const PriceListPage = () => {
  return (
    <div className="max-w-screen-2xl mx-auto ">
      <PriceTable />
      <Image
        src="/magnify-glass.svg"
        alt="cake"
        width={200}
        height={200}
        className="flex justify-center items-center"
      />
    </div>
  );
};

export default PriceListPage;
