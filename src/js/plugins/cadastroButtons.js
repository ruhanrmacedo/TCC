import $ from 'jquery'
import { onLoadHtmlSuccess } from '../core/includes'

const duration = 300

function filterByCadastro(cadastro) {
    $('[wm-cadastro]').each(function(i, e) {
      const isTarget = $(this).attr('wm-cadastro') === cadastro || cadastro === null
      if(isTarget) {
        $(this).removeClass('d-none')
        $(this).fadeIn(duration)
      } else {
        $(this).fadeOut(duration, () => {
          $(this).addClass('d-none')
        })
      }
    })
  }

$.fn.cadastroButtons = function () {
  const cadastros = new Set
  $('[wm-cadastro]').each(function(i, e) {
    cadastros.add($(e).attr('wm-cadastro'))
  })

  const btns = Array.from(cadastros).map(cadastro => {
    const btn = $('<button>')
      .addClass(['btn', 'btn-info']).html(cadastro)
    btn.click(e => filterByCadastro(cadastro))
    return btn
  })

  const btnGroup = $('<div>').addClass(['btn-group'])
  btnGroup.append(btns)

  $(this).html(btnGroup)
  return this
}

onLoadHtmlSuccess(function() {
  $('[wm-cadastro-buttons]').cadastroButtons()

  $('[wm-cadastro]').addClass('d-none')

})