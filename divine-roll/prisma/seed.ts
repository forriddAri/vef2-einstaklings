import { card_type, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const cards = [
    { name: "Judas", type: card_type.messenger, cost: 2, effect: "deal 4 damage to your saint", power: 3, health: 4 },
    { name: "Peasant", type: card_type.messenger, cost: 1, power: 1, health: 1 },
    { name: "Church", type: card_type.messenger, cost: 2, effect: "At the end of your turn, draw a card", power: 0, health: 2 },
    { name: "Part the Red Sea", type: card_type.miracle, cost: 3, effect: "Draw 2 messengers from your deck" },
    { name: "Feeding the multitude", type: card_type.miracle, cost: 2, effect: "Restore 3 health to all messengers" },
    { name: "Peter", type: card_type.messenger, cost: 3, effect: "Gains +1 power when another messenger is played", power: 0, health: 5 },
    { name: "James (son of Zebedee)", type: card_type.messenger, cost: 4, power: 4, health: 5 },
    { name: "John", type: card_type.messenger, cost: 5, effect: "Heal all friendly characters for 3", power: 2, health: 6 },
    { name: "Andrew", type: card_type.messenger, cost: 2, effect: "At the start of your turn, draw 1 card", power: 2, health: 3 },
    { name: "Philip", type: card_type.messenger, cost: 3, effect: "At the beginning of next turn gain +1 prayer", power: 2, health: 4 },
    { name: "Bartholomew", type: card_type.messenger, cost: 2, power: 3, health: 3 },
    { name: "Matthew", type: card_type.messenger, cost: 3, effect: "When played, gain 1 extra resource this turn", power: 2, health: 4 },
    { name: "Thomas", type: card_type.messenger, cost: 2, effect: "Opponents next miracle costs +1", power: 2, health: 2 },
    { name: "James (son of Alphaeus)", type: card_type.messenger, cost: 7, power: 6, health: 7 },
    { name: "Thaddaeus", type: card_type.messenger, cost: 6, effect: "give other messengers +1 power", power: 3, health: 6 },
    { name: "Simon the Zealot", type: card_type.messenger, cost: 4, effect: "Has +2 power when attacking", power: 3, health: 5 },
    { name: "Turning Water into Wine", type: card_type.miracle, cost: 2, effect: "Transform a random card in your hand into a miracle" },
    { name: "Healing the Blind Man", type: card_type.miracle, cost: 1, effect: "Restore 3 health to a messenger" },
    { name: "Walking on Water", type: card_type.miracle, cost: 4, effect: "Give a messenger divine protection for 1 turns" },
    { name: "Calming the Storm", type: card_type.miracle, cost: 3, effect: "All enemy messengers lose 2 power this turn" },
    { name: "Resurrection of Lazarus", type: card_type.miracle, cost: 6, effect: "Revive a random messenger from your graveyard" },
    { name: "Healing the Leper", type: card_type.miracle, cost: 4, effect: "Fully heal a messenger and give it +1 power" },
    { name: "Casting Out Demons", type: card_type.miracle, cost: 3, effect: "Destroy an enemy messenger with 3 or less power" },
    { name: "Healing the Paralytic", type: card_type.miracle, cost: 3, effect: "Restore 6 health to your hero" },
    { name: "Healing the Woman with the Issue of Blood", type: card_type.miracle, cost: 4, effect: "All friendly messengers recover 2 health" },
    { name: "Cursing the Fig Tree", type: card_type.miracle, cost: 4, effect: "Deal 2 damage to all enemies" },
    { name: "The Resurrection", type: card_type.miracle, cost: 9, effect: "Fill your board with messengers from your graveyard" },
  ];
  

  async function main() {
    await prisma.card.deleteMany();
    for (const card of cards) {
      await prisma.card.create({ data: card });
    }
    console.log("Seeded cards!");
  }
  
  main()
    .catch((e) => {
      console.error("Seed error:", e);
      process.exit(1);
    })
    .finally(() => prisma.$disconnect());
