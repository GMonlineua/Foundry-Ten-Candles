/* -------------------------------------------- */
/*  Document Classes                     */
/* -------------------------------------------- */

// Actor class
class TenCandlesActor extends Actor {
  prepareDerivedData() {
    const actorData = this;
    const systemData = actorData.system;
    const flags = actorData.flags.tencandles || {};
  }
}

// Item class
class TenCandlesItem extends Item {
  prepareData() {
    super.prepareData();
  }
}

/* -------------------------------------------- */
/*  Sheet Classes                              */
/* -------------------------------------------- */

// Actor sheet class
class TenCandlesActorSheet extends ActorSheet {

  /** @override */
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["tencandles", "sheet", "actor"],
      template: "systems/tencandles/templates/actor-sheet.hbs",
      width: 600,
      height: 700
    });
  }

  /** @override */
  getData() {
    const context = super.getData();
    const actorData = this.actor.toObject(false);
    context.system = actorData.system;
    context.flags = actorData.flags;
    return context;
  }

  /** @override */
  get template() {
    if ( !game.user.isGM && this.actor.limited ) return "systems/tencandles/templates/limited-sheet.hbs";
    return `systems/tencandles/templates/actor-sheet.hbs`;
  }
}

// Item sheet class
class TenCandlesItemSheet extends ItemSheet {

  /** @override */
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["tencandles", "sheet", "item"],
      template: "systems/tencandles/templates/item-sheet.hbs",
      width: 600,
      height: 450
    });
  }

  /** @override */
  getData() {
    const context = super.getData();
    const itemData = context.item;
    context.system = itemData.system;
    context.flags = itemData.flags;
    return context;
  }

  /** @override */
  activateListeners(hbs) {
    super.activateListeners(hbs);
    if (!this.isEditable) return;
  }
}

/* -------------------------------------------- */
/*  Init Hook                                   */
/* -------------------------------------------- */

Hooks.once('init', async function() {

  // Add utility classes to the global game object so that they're more easily
  // accessible in global contexts.
  game.tencandles = {
    TenCandlesActor,
    TenCandlesItem
  };

  // Define custom Document classes
  CONFIG.Actor.documentClass = TenCandlesActor;
  CONFIG.Item.documentClass = TenCandlesItem;

  // Register sheet application classes
  Actors.unregisterSheet("core", ActorSheet);
  Actors.registerSheet("tencandles", TenCandlesActorSheet, { makeDefault: true });
  Items.unregisterSheet("core", ItemSheet);
  Items.registerSheet("tencandles", TenCandlesItemSheet, { makeDefault: true });
});
