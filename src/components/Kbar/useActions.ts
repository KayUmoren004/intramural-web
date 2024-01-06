import type { ActionId, ActionImpl } from "kbar";

type Action = {
  id: ActionId;
  name: string;
  shortcut?: string[];
  keywords?: string;
  section?: string;
  icon?: string | React.ReactElement | React.ReactNode;
  subtitle?: string;
  perform?: (currentActionImpl: ActionImpl) => any;
  parent?: ActionId;
};

type ActionProps = {
  initialActions: Action[];
};

const useActions = ({ initialActions }: ActionProps) => {};

export default useActions;
