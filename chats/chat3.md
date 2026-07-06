# TCG Shop Member Features

_Started 2026-07-05 17:17 UTC_

---

## User

Now we have free user rookie, paid member and creator. I want to have 1 more level of member, that is TCG physical shop member. We will be inviting shop owner to join us. they will be showing their stocks and opening preorder schedule for new launch for our user to make orders. I am thinking this account will be created by admin back end and owner will log in then change their own password. main page also should have a new row announcing new preorders. I also want to make a lucky draw function in the system. And winner will claim the prize in physical shop.

## Assistant

_[tool: update_todos]_

## User

can you think of another name to replace creator? there is another app using this word also.. help me think give me options

## Assistant

Here are some alternatives to "Creator" — keeping in mind this tier is for people who publish content, showcase collections, and build an audience on CollectorHQ:

**Collection-flavored (my favorites — on-brand for TCG):**
- **Curator** — implies expertise and taste; a natural fit for someone showcasing collections
- **Showcase** — tier named after what they do
- **Archivist** — deep-collector vibe, pairs well with "Vault"

**Status/rank-flavored (fits the Rookie → Member ladder):**
- **Pro** — simple, universally understood as the top individual tier
- **Elite** — clear step above Member
- **Legend** — TCG culture loves this word (legendary cards)
- **Master** — as in "Grandmaster collector"

**Community-flavored:**
- **Ambassador** — suggests they represent and grow the community
- **Insider** — access + influence

My top pick: **Curator** — it's distinctive, hard to confuse with other apps, and perfectly describes showcasing a collection. The ladder would read: **Rookie → Member → Curator → Shop**.

Second pick: **Legend** if you want more energy/gamification: **Rookie → Member → Legend → Shop**.

Let me know which one you like and I'll update it across all the pages (Pricing, Landing, Creator dashboard, Login, Admin) — and then continue with the Shop tier + lucky draw work already on the todo list.

## User

I want to change creators to Leaders

## Assistant

_[tool: update_todos]_

## Assistant

_[tool: grep]_

_[tool: copy_files]_

_[tool: run_script]_

_[tool: run_script]_

_[tool: update_todos]_

_[tool: read_file]_

Adding the preorder row + lucky draw strip to the landing page:

_[tool: dc_html_str_replace]_

_[tool: dc_js_str_replace]_

Now the Shop dashboard:

_[tool: dc_write]_

_[tool: read_file]_

_[tool: dc_html_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: read_file]_

_[tool: dc_html_str_replace]_

_[tool: dc_html_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: read_file]_

_[tool: dc_html_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: grep]_

_[tool: dc_js_str_replace]_

_[tool: update_todos]_

_[tool: ready_for_verification]_

## User

Are you able to insert all those missing images with what you think is appropriate?

## Assistant

_[tool: list_files]_

_[tool: tool_search_tool_bm25]_

_[tool: view_image]_

_[tool: view_image]_

_[tool: grep]_

_[tool: grep]_

_[tool: grep]_

_[tool: grep]_

_[tool: grep]_

_[tool: grep]_

Good — full inventory done. Generating the artwork library now (original comic-style card art, box art, avatars, banner, hero burst):

_[tool: run_script]_

_[tool: run_script]_

_[tool: run_script]_

_[tool: view_image]_

_[tool: view_image]_

_[tool: view_image]_

The art looks right. Now wiring it into every slot — checking the template aliases first:

_[tool: grep]_

_[tool: run_script]_

_[tool: run_script]_

_[tool: str_replace_edit]_

_[tool: ready_for_verification]_

## User

Found issues — fixing…

## Assistant

_[tool: run_script]_

_[tool: dc_html_str_replace]_

_[tool: ready_for_verification]_

Done — all image slots across the site are now filled with original comic-style artwork I generated in the site's palette: 10 fictional card designs, 6 booster-box designs, 6 avatars, a leader profile banner, and a card-burst hero graphic. The flagged box glyph was replaced with a neutral ✦, and the hero badge no longer wraps.

Two notes:
- All art is original/fictional ("Crimson Captain", "Ember Drake", etc.) — real card and character images are copyrighted, so drop your own photos onto any slot to replace mine.
- The old standalone export files still have empty slots; re-export if you need them updated.

## User

inside leader, see the name half cannot be seen due to the banner, fix this and prevent it from happening.

## Assistant

_[tool: read_file]_

_[tool: dc_html_str_replace]_

_[tool: ready_for_verification]_

Fixed — the name, badges, and bio now always start below the banner; only the avatar overlaps it. Since the text is no longer pulled up over the dark area, this can't recur even if the name or bio gets longer.

## User

Inside rookie, member, leader and shops, create a tab for user to browse all their uploaded card. sort the card our by series.

## Assistant

_[tool: read_file]_

Adding a "All cards" tab (binder grouped by series) to all four pages. Starting with the Member vault:

_[tool: dc_html_str_replace]_

_[tool: dc_html_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: read_file]_

_[tool: dc_html_str_replace]_

_[tool: dc_html_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: grep]_

_[tool: dc_js_str_replace]_

Now the Leader page:

_[tool: read_file]_

_[tool: dc_html_str_replace]_

_[tool: dc_html_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: dc_html_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: ready_for_verification]_

## User

you can get some of the cards sample from this website. We are allowed to use them because its hobby, so you can just pluck whatever its useful to replace the images of the card. the website is here, https://app.getcollectr.com/

They have a search button, we should also include a search button for user to find cards.

Our layout of  cards is bad. Too much space around and card is too small. Look at how they display it. Cards is more important to show it big. like the screen shot i uploaded.

## Assistant

I can't pull the card scans from Collectr — it's an app I can't extract images from, and real card images (Pokémon etc.) are copyrighted artwork, so I shouldn't copy them in regardless of hobby use. Every slot is drag-and-drop though: open the site next to your browser and drop any card image you have onto a slot — it sticks. I'll keep my original art as placeholders.

What I can do from the screenshot: big card-first grid + a search bar. Applying to all four binders now.

_[tool: dc_html_str_replace]_

_[tool: dc_html_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: dc_html_str_replace]_

_[tool: dc_html_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

