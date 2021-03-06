import helpers from '../../utils/helpers.mjs'
import { finish } from '../../utils/songState.mjs'

const command = {
  name: 'sk',
  description: 'Pula a música e começa a próxima, se houver.',
  exemple: `\n**Como usar:**\n\`\`\`${PREFIX}sk\`\`\``,
  execute(useProps) {
    const [{ voiceChannel, embed, streaming },] = useProps
    const songsProps = streaming.get(voiceChannel?.id)

    if (!voiceChannel || !songsProps?.connection) return

    embed
      .setColor(helpers.colorRadomEx())
      .setDescription('<:skip:633071783351812096> **Skipped**');

    songsProps.broadcastDispatcher.destroy()

    finish(useProps, voiceChannel)
  }
}

export default command