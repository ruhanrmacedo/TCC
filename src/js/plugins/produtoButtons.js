import { onLoadHtmlSuccess } from '../core/includes'

import $ from 'jquery'

const duration = 300

function filterByProdutos(produto) {
    $('[wm-produto]').each(function (i, e) {
      const isTarget = $(this).attr('wm-produto') === produto || produto === null;
      if (isTarget) {
        $(this).parent().removeClass('d-none');
        $(this).fadeIn(duration);
        $('.form-product').removeClass('d-none'); // Remova a classe que oculta o formulário
      } else {
        $(this).fadeOut(duration, () => {
          $(this).parent().addClass('d-none');
          $('.form-product').addClass('d-none'); // Adicione a classe para ocultar o formulário
        });
      }
    });
  }

$('.form-product button[type="submit"]').click(function (e) {
    e.preventDefault();
    const produto = $(this).closest('.form-product').attr('data-produto');
    filterByProdutos(produto);
});

$.fn.produtoButtons = function () {

    const produtos = new Set
    $('[wm-produto]').each(function (i, e) {
        produtos.add($(e).attr('wm-produto'))
    })

    const btns = Array.from(produtos).map(produto => {
        const btn = $('<button>')
            .addClass(['btn', 'btn-info']).html(produto)
        btn.click(e => {
            filterByProdutos(produto)
            $('[wm-produto]').parent().addClass('d-none')
            $(`[wm-produto="${produto}"]`).parent().removeClass('d-none')
        })
        return btn
    })

    const btnAll = $('<button>')
        .addClass(['btn', 'btn-info', 'active']).html('Todas')
    btnAll.click(e => {
        filterByProdutos(null)
        $('[wm-produto]').parent().removeClass('d-none')
    })
    btns.push(btnAll)

    const btnGroup = $('<div>').addClass(['btn-group'])
    btnGroup.append(btns)

    $(this).html(btnGroup)
    return this
}

onLoadHtmlSuccess(function () {
    $('[wm-produto-buttons]').produtoButtons()
})