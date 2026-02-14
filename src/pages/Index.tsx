import { useState } from "react";
import FloatingPetals from "@/components/FloatingPetals";
import HeartProposal from "@/components/HeartProposal";
import FinalScene from "@/components/FinalScene";

const Index = () => {
  const [accepted, setAccepted] = useState(false);

  return (
    <div className="bg-background min-h-screen">
      <FloatingPetals />

      <HeartProposal onAccept={() => setAccepted(true)} />

      {accepted && (
        <>
          <FinalScene />
        </>
      )}
    </div>
  );
};

export default Index;
