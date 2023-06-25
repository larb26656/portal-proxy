export type PortalProxyIconId =
  | "add-solid"
  | "close-solid"
  | "copy-solid"
  | "delete-solid"
  | "git-hub-solid"
  | "more-vert-solid";

export type PortalProxyIconKey =
  | "AddSolid"
  | "CloseSolid"
  | "CopySolid"
  | "DeleteSolid"
  | "GitHubSolid"
  | "MoreVertSolid";

export enum PortalProxyIcon {
  AddSolid = "add-solid",
  CloseSolid = "close-solid",
  CopySolid = "copy-solid",
  DeleteSolid = "delete-solid",
  GitHubSolid = "git-hub-solid",
  MoreVertSolid = "more-vert-solid",
}

export const PORTAL_PROXY_ICON_CODEPOINTS: { [key in PortalProxyIcon]: string } = {
  [PortalProxyIcon.AddSolid]: "61697",
  [PortalProxyIcon.CloseSolid]: "61698",
  [PortalProxyIcon.CopySolid]: "61699",
  [PortalProxyIcon.DeleteSolid]: "61700",
  [PortalProxyIcon.GitHubSolid]: "61701",
  [PortalProxyIcon.MoreVertSolid]: "61702",
};
