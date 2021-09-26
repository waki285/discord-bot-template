//常時起動のためにサーバーを立てます。
const http = require("http");
http.createServer((req, res) => {
  res.write("Server is active!");
  res.end();
}).listen(8080);

//Discordをインポート
const discord = require("discord.js");
const client = new discord.Client({ intents: [discord.Intents.FLAGS.GUILDS, discord.Intents.FLAGS.GUILD_MESSAGES] });

//各種定義
const prefix = process.env.prefix;

//Bot起動時
client.on('ready', async () => {
  console.log("Botが起動しました！");
  client.user.setActivity({ name: process.env.activity, type: process.env.acttype });
  client.application.commands.set([
    {
      name: "ping",
      description: "Pingを測ります。"
    }
  ], process.env.guild);
});

//スラッシュコマンド(interaction)を受け取る
client.on('interactionCreate', async (interaction) => {
  if (interaction.isCommand()) {
    const command = interaction.commandName;
    const options = interaction.options;
    if (command === "ping") {
      interaction.reply({ content: `只今のPing値は${client.ws.ping}msです。` });
    }
  }
});

//メッセージを受け取る
client.on('messageCreate', async (message) => {
  if (message.author.bot) return;
  if (message.content.match(/(にゃー|にゃ〜)/)) {
    message.reply("にゃ〜");
  }
});


//ログイン
client.login(process.env.BOT_TOKEN);