import { onLoadHtmlSuccess } from '../core/includes'

import $ from 'jquery'

const duration = 300

function filterBymercadoria(mercadoria) {
    $('[wm-mercadoria]').each(function(i, e) {
        const isTarget = $(this).attr('wm-mercadoria') === mercadoria
            || mercadoria === null
        if(isTarget) {
            $(this).parent().removeClass('d-none')
            $(this).fadeIn(duration)
        } else {
            $(this).fadeOut(duration, () => {
                $(this).parent().addClass('d-none')
            })
        }
    })
}

$.fn.mercadoriaButtons = function () {
    
    const mercadorias = new Set
    $('[wm-mercadoria]').each(function(i, e) {
        mercadorias.add($(e).attr('wm-mercadoria'))
    })

    const btns = Array.from(mercadorias).map(mercadoria => {
        const btn = $('<button>')
            .addClass(['btn', 'btn-info']).html(mercadoria)
        btn.click(e => filterBymercadoria(mercadoria))
        return btn
    })

    const btnAll = $('<button>')
        .addClass(['btn', 'btn-info', 'active']).html('Todas')
    btnAll.click(e => filterBymercadoria(null))
    btns.push(btnAll)

    const btnGroup = $('<div>').addClass(['btn-group'])
    btnGroup.append(btns)

    $(this).html(btnGroup)
    return this
}

onLoadHtmlSuccess(function() {
    $('[wm-mercadoria-buttons]').mercadoriaButtons()
})