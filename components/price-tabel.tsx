import { FC } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Cennik - dane statyczne
const priceList = [
  {
    type: "Konsultacja fizjoterapeutyczna",
    price: "150 PLN",
    duration: "45 minut",
  },
  { type: "Masaż leczniczy", price: "100 PLN", duration: "30 minut" },
  { type: "Terapia manualna", price: "180 PLN", duration: "60 minut" },
  {
    type: "Rehabilitacja ortopedyczna",
    price: "200 PLN",
    duration: "60 minut",
  },
  { type: "Kinesiotaping", price: "50 PLN", duration: "15 minut" },
];

const PriceTable: FC = () => {
  return (
    <div className="my-8 p-4 bg-white rounded-lg shadow-lg border">
      <h2 className="text-2xl font-bold mb-6 text-center text-green-500 drop-shadow-md">
        Cennik usług
      </h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="font-semibold text-green-600">
              Rodzaj badania
            </TableHead>
            <TableHead className="font-semibold text-green-600">Cena</TableHead>
            <TableHead className="font-semibold text-green-600">
              Czas trwania
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {priceList.map((item, index) => (
            <TableRow key={index}>
              <TableCell className="text-green-800">{item.type}</TableCell>
              <TableCell className="text-green-800">{item.price}</TableCell>
              <TableCell className="text-green-800">{item.duration}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default PriceTable;
