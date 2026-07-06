export async function fetchWorkItemTimeline(
  owner: string,
  repo: string,
  number: number,
) {
  const res = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/issues/${number}/timeline`,
    {
      headers: {
        Accept: "application/vnd.github+json",
      },
    },
  );

  if (!res.ok)
    throw new Error(`GitHub API error: ${res.status} - ${res.statusText}`);

  return res.json();
}

export async function fetchWorkItemData(
  owner: string,
  repo: string,
  type: string,
  number: number,
) {
  const urlType = type.replace("pull", "pulls");
  const res = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/${urlType}/${number}`,
    {
      headers: {
        Accept: "application/vnd.github+json",
      },
    },
  );
  if (!res.ok)
    throw new Error(`GitHub API error: ${res.status} - ${res.statusText}`);

  return res.json();
}
