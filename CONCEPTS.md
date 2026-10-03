# CONCEPTS.md: three candidates for our game

> 2026-10-03 · Proposed by Claude from `reports/Why job simulator games are fun.md`.
> **Urfan picks.** Nothing gets built for real until a concept passes the toy test (below).

## How these were chosen (from the research)

- **Verb first, then ladder, then theme.** Each concept has one physical action only that
  theme has, which changes something visible within a second.
- **Every level changes the work.** Each step on the ladder adds a new action, place,
  customer type, threat or risk. "Same thing ×10" is not a level.
- **The player gets better, not just the shop.** There is a named skill that no upgrade can
  replace. Upgrades sell better *information*, never the answer.
- **Tight money, real but survivable loss.** Rent or debt is due weekly; bad buys cost money;
  a bust never wipes the save.
- **Mischief the player chooses** makes the stories and clips.
- **Open lanes only.** Supermarket, card shop, food, bakery, drugs and internet cafe are
  saturated; car mechanic, farming and power-washing are franchise-held.

---

## 1. SECOND HAND: restore junk, flip it for profit ⭐ recommended

**Pitch:** Buy junk at dawn garage sales, restore it by hand on your workbench, and flip it.
You start with a borrowed garage and end with the city's best antique shop.

**2-second clip:** A filthy rusty object; the wire brush sweeps across it and chrome shines
through. The price tag flips from $5 to $480.

**Core action:** restoring by hand: scrub rust, sand, polish, repaint, glue. Each part gets a
"ding" when it's done (the PowerWash recipe). Restoration videos are already a huge genre on
YouTube and TikTok.

**The skill you get better at:**
- **Spotting value in junk:** maker's marks, real versus fake materials, hidden cracks.
- **Haggling** with sellers.
- **Knowing when NOT to restore.** Collectors pay more for original patina, so sanding a real
  antique destroys its value. This is a real judgement call no upgrade can make for you.

**Risk:** buying fakes or duds, damaging an item by pushing too hard, and weekly garage rent
to a pushy landlord.

**The ladder (each step changes the work):**
1. Garage sales + your garage workbench: cleaning and rust removal (bikes, toolboxes, lamps).
2. Paint booth: masking and spray painting, a new action.
3. Thrift-store bulk bins: buying by the box and sorting treasure from trash, a new place and a
   new decision.
4. Woodwork: sanding, staining and gluing furniture. You need a van, and loading it is a
   puzzle.
5. Selling online: stage and photograph items to sell (lighting, angles), and buyers haggle by
   message. A new action and new customers.
6. Storage-unit auctions: bid against rivals on whole units, a new risk profile. (Reuses
   our auction research.)
7. Antique fairs: fakes appear (a new threat), with authentication tools (UV lamp, loupe).
8. Estate sales of rich families: huge stakes, and vintage electronics to rewire.
→ Then a second shop in a new district: back to tight money, under new rules.

**Mischief:** sell a reproduction as "vintage", lowball a seller who doesn't know what they
have, flip a $3 lamp to a snob for $300.
**Automation:** hire a helper for cheap cleaning and hauling; the hero pieces stay in your
hands.
**Co-op (2–4):** natural role split: one scouts and haggles, one restores, and everyone
carries the wardrobe down the stairs. Design for it from day one.
**Market:** the flipping and thrift lane is open: Thrifty Business 97%, Storage Hunter only
78%. Restoration content is proven on video. House Flipper does houses, not objects.
**Build cost:** medium. Venues come from store asset packs. One dirt/rust/paint shader system
works on any prop from a pack, so new items are cheap to add. That is the key technical bet.

---

## 2. UNDER THE COUNTER: night pawn shop, spot the fakes, choose how dirty you get

**Pitch:** Run a late-night pawn shop. Inspect what walks through the door, catch the fakes
and the stolen goods, and decide how dirty your hands get.

**2-second clip:** A UV lamp sweeps over a "Rolex" and reveals a fake mark, or the police
knock while a stolen TV sits in your back room.

**Core action:** inspecting with physical tools (loupe, UV lamp, scale, magnet, acid test,
serial-number lookup), then haggling face to face.

**The skill you get better at:** spotting fakes, reading customers' honest tells, pricing.
**Risk:** a fake is a loss; stolen goods raise police heat and can trigger a raid; rent is owed
to a loan shark.

**The ladder:** jewellery → watches (open the case back) → electronics (serials against the
police list) → art (UV, brushwork) → a back-room fence (the illegal fork) → cops and
informants → auction-house consignments → a collectors' black market.

**Mischief:** sell fakes, double-cross the fence, lowball desperate customers.
**Co-op:** a strong split. One player at the counter, one in the back checking the database
(like *Keep Talking and Nobody Explodes*).
**Market:** sits between two hot lanes (inspection and appraisal), but the direct rival
*Probably Stolen* (a cyberpunk pawn sim, 100K wishlists) launches **28 Oct 2026**. Within a few
weeks we'll see whether the lane is hungry or taken.
**Build cost:** medium-high. Items need real and fake variants, and customer tells need good
faces and animation, which is the hardest part.

---

## 3. SIGNAL REPAIR: fix the 90s

**Pitch:** Repair the Game Boys, CRT TVs and Walkmans people bring in, and sell the ones you
rescue.

**2-second clip:** A dead Game Boy. Screws out, a capacitor swapped, and the screen lights up
with the startup chime.

**Core action:** take it apart, diagnose with a multimeter, replace the part, power it on.
**The skill you get better at:** diagnosis, a logic puzzle from symptoms to fault. Tools give
readings, never answers.
**Risk:** misdiagnosis wastes parts, CRTs can shock you, customers bring things back.
**The ladder:** handhelds → cassette players → CRTs (danger) → consoles (mods) → arcade
cabinets → broken job lots from flea markets (a gamble) → custom mod builds → museum and
collector restorations.
**Co-op:** weak to moderate.
**Market:** nostalgia is open (Retro Rewind sold about 200K in 2 weeks), and electronics sit
apart from Car Mechanic's franchise.
**Build cost:** the highest. Many custom device models with working internals.

---

## Recommendation and next step

1. **Lead candidate: SECOND HAND.** It has the strongest clip hook (restoration before and
   after), an open lane, a protected skill ("don't sand the patina"), a natural co-op split,
   and content that scales cheaply through one shader system.
2. **Toy test, up to 5 days each, in the Unity project at `/Users/urfan/game_dev/SimGame`:**
   - **Second Hand toy:** one rusty object on a workbench, three tools (wire brush,
     sandpaper, spray paint), a "ding" for each part, a before/after reveal. No money, no
     goals.
   - **Under the Counter toy:** a counter, a customer with an item, three tools, a buy or
     refuse choice, then the truth is revealed.
3. **Kill rule:** most testers keep playing 10+ extra minutes when told "stop whenever you
   like", and Urfan wants to keep playing. If a toy misses, drop it and move on.
