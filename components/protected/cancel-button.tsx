// "use client";
// import { deleteEvent } from "@/server/googleCalendar";
// import { Button } from "../ui/button";
// import { useRouter } from "next/navigation";

// interface CancelButtonProps {
//   clerkUserId: string;
//   eventId: string;
// }

// const CancelButton = ({ clerkUserId, eventId }: CancelButtonProps) => {
//   const router = useRouter();

//   const handleCancel = async () => {
//     if (window.confirm("Are you sure you want to cancel this meeting?")) {
//       await deleteEvent(clerkUserId, eventId);
//       router.refresh();
//     }
//   };
//   return (
//     <Button variant="destructive" onClick={handleCancel}>
//       Anuluj Spotkanie
//     </Button>
//   );
// };

// export default CancelButton;
