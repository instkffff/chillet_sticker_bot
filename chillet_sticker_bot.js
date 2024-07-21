const { Telegraf } = require('telegraf')
require('dotenv').config({path:'conf.env'})

const bot = new Telegraf(process.env.BOT_TOKEN)

bot.help((ctx) => ctx.reply('chillet sticker bot --author NightCandle'))

bot.on('inline_query',async(ctx) => {

    if(ctx.inlineQuery.query.length === 0){
        path = '/animation_gif/'
        Image_type = 'gif'
        Image_arc = 'gif'
        num = process.env.GIF_NUM
    }else if(ctx.inlineQuery.query === "gif"){
        path = '/animation_gif/'
        Image_type = 'gif'
        Image_arc = 'gif'
        num = process.env.GIF_NUM
    }else if(ctx.inlineQuery.query === "image"){
        path = '/png/'
        Image_type = 'photo'
        Image_arc = 'png'
        num = process.env.PNG_NUM
    }

    const offset = parseInt(ctx.inlineQuery.offset) || 0 
    const item = []
    const url = process.env.URL

    for (let i=0; i<num; i++){
        let full_url = `${url}${path}${i+1}.${Image_arc}`
        item.push({
            type : Image_type, 
            id : String(i+1),
            url : full_url,
            thumbnail_url : full_url
        })
    }

    if(Image_arc === 'png'){
        results = item.slice(offset, offset+10).map((item) => ({
            type : item.type,
            id : item.id,
            photo_url : item.url,
            thumbnail_url : item.thumbnail_url
        }))
    }else{
        results = item.slice(offset, offset+10).map((item) => ({
            type : item.type,
            id : item.id,
            gif_url : item.url,
            thumbnail_url : item.thumbnail_url
        }))    
    }

    

    await ctx.answerInlineQuery(results, { next_offset: offset + 10 }, { cache_time: 10 })
})

bot.launch()
