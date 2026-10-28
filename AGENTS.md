<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->
- Business data (prices, contacts, address, WhatsApp/Maps links) lives in src/lib/site.ts; edit there so all sections stay consistent.
- Keep one dependencies object for application packages and one devDependencies object for tooling; duplicate JSON keys silently discard required packages.
- Use bun.lock as the sole dependency lockfile and Bun for installs to avoid conflicting dependency trees.
- Keep Tailwind and its Vite integration on the same exact version; the shared Lovable Vite config already registers the plugin.
