import Button from "@mui/joy/Button";

type ResetBtnProps = {
  setInitial: () => void;
};

export function ResetBtn({ setInitial }: ResetBtnProps) {
  return (
    <Button
      sx={{ width: "100%" }}
      variant="plain"
      color="danger"
      onClick={setInitial}
    >
      Reset Stat
    </Button>
  );
}
