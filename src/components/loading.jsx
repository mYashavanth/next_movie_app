import { Spinner } from "@chakra-ui/react";

export default function Loading() {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Spinner w={"100px"} h={"100px"} color="teal" />
    </div>
  );
}
