let defines = [db => {
    return db.define('transfer', {
        from: {
            required: true,
            type: "text",
            size: 12
        },
        to: {
            required: true,
            type: "text",
            size: 12
        },
        quantity: {
            required: true,
            type: "text",
            size: 256
        },
        memo: {
            type: "text",
            size: 256
        }
    }, {});
}];

let account = "fibos";

let hooks = {
    "eosio.token/transfer": (db, messages) => {
        let Transfer = db.models.transfer;
        try {
            db.trans(() => {
                messages.forEach((m) => {
                    let data = m.act.data;
                    if (data.from !== account || data.to !== account) return;
                    Transfer.createSync(data);
                });
            });
        } catch (e) {
            console.error("eosio.token/transfer Error:", e);
        }
    }
}

module.exports = {
    defines: defines,
    hooks: hooks
}