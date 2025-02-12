import { Button } from "@mui/joy";

type ShowBtnProps = {
  isShown: boolean;
  setShown: React.Dispatch<React.SetStateAction<boolean>>;
};

export function ShowBtn({ isShown, setShown }: ShowBtnProps) {
  return (
    <Button
      sx={{ width: "100%" }}
      variant="plain"
      color="primary"
      onClick={() => setShown(!isShown)}
    >
      {isShown ? "Hide extr Info" : "Show extr Info"}
    </Button>
  );
}
