// School Select

type School = {
  label: string;
  value: string;
};

export type SchoolSelect = {
  title: string;
  setString: string;
  placeholder: string;
  data: School[];
  setValue: React.Dispatch<React.SetStateAction<School>>;
};
