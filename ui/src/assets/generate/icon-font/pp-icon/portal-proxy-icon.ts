export type PortalProxyIconId =
  | "add-solid"
  | "close-solid"
  | "delete-solid"
  | "git-hub-solid";

export type PortalProxyIconKey =
  | "AddSolid"
  | "CloseSolid"
  | "DeleteSolid"
  | "GitHubSolid";

export enum PortalProxyIcon {
  AddSolid = "add-solid",
  CloseSolid = "close-solid",
  DeleteSolid = "delete-solid",
  GitHubSolid = "git-hub-solid",
}

export const PORTAL_PROXY_ICON_CODEPOINTS: { [key in PortalProxyIcon]: string } = {
  [PortalProxyIcon.AddSolid]: "61697",
  [PortalProxyIcon.CloseSolid]: "61698",
  [PortalProxyIcon.DeleteSolid]: "61699",
  [PortalProxyIcon.GitHubSolid]: "61700",
};
