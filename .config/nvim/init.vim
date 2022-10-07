scriptencoding utf-8
set encoding=utf-8
set clipboard+=unnamedplus

set nocompatible              " be iMproved, required
filetype off                  " required

set titlestring=%F%m\ (%L\ lines)
set title   " enable setting terminal title

set cmdheight=0

call plug#begin()

Plug 'vim-airline/vim-airline'
Plug 'vim-airline/vim-airline-themes'

"" These should be lazy loaded in the future.
"Plug 'pangloss/vim-javascript'
"Plug 'mxw/vim-jsx'
"Plug 'JuliaEditorSupport/julia-vim'
"Plug 'arcticicestudio/nord-vim'
"Plug 'purescript-contrib/purescript-vim'
"Plug 'sheerun/vim-polyglot'
"Plug 'https://git.sr.ht/~torresjrjr/vim-gemini'

"Plug 'twitvim/twitvim.git'
"Plug 'chrisbra/Colorizer'

Plug 'kovisoft/slimv'

" Dark mode set background
Plug 'cormacrelf/dark-notify'

" Markdown
Plug 'SidOfc/mkdx'

Plug 'lervag/vimtex'

Plug 'junegunn/fzf', { 'do': { -> fzf#install() } }
Plug 'junegunn/fzf.vim'

Plug 'mg979/vim-visual-multi', {'branch': 'master'}

Plug 'pantharshit00/vim-prisma'

" treesitter
Plug 'nvim-treesitter/nvim-treesitter', {'do': ':TSUpdate'}
" lsp
Plug 'williamboman/mason.nvim'
Plug 'williamboman/mason-lspconfig.nvim'
Plug 'WhoIsSethDaniel/mason-tool-installer.nvim'
Plug 'neovim/nvim-lspconfig'
Plug 'ms-jpq/coq_nvim', {'branch': 'coq'}

" zig
Plug 'ziglang/zig.vim'

call plug#end()

filetype plugin indent on    " required

" Highlight color codes
"autocmd VimEnter * ColorHighlight

set conceallevel=2
set cc=80
set cinoptions=l1
let g:neovide_cursor_antialiasing=v:true
set ignorecase
set smartcase
set t_Co=256
set number
set rnu
syntax off

set cursorline
hi CursorLine   cterm=NONE ctermbg=black
hi CursorLineNR cterm=NONE ctermbg=black

"hi lschrs cterm=NONE ctermfg=black guifg=gray30
"match lschrs /$/
"2match lschrs /\t/

let $NVIM_TUI_ENABLE_CURSOR_SHAPE = 0
set guicursor=
set guicursor=n-v:hor50,i:ver25
"set guifont=Iosevka:h30

filetype plugin indent on

set tabstop=4       " The width of a TAB is set to 4.
set shiftwidth=4    " Indents will have a width of 4
set softtabstop=4   " Sets the number of columns for a TAB
"set expandtab       " Expand TABs to spaces

" Leader
let mapleader = " "

" Spell
autocmd FileType tex setlocal spell
autocmd FileType markdown setlocal spell
autocmd FileType html setlocal spell
autocmd FileType gemini setlocal spell
autocmd FileType gitcommit setlocal spell
set spelllang=en

nnoremap <silent> <F11> :set spell!<cr>
inoremap <silent> <F11> <C-O>:set spell!<cr>

" Terminal (:term) buffer
set splitbelow
set shell=zsh
nnoremap <F5> :sp +term<CR>:resize -8<CR>i

" Netrw
let g:netrw_liststyle = 3
let g:netrw_banner = 0
let g:netrw_winsize = 25
let g:netrw_browse_split = 4
let g:netrw_altv = 1

augroup ProjectDrawer
  autocmd!
  autocmd filetype netrw call NetrwMapping()
augroup END

function! NetrwMapping()
  noremap <buffer> t :q<CR>
endfunction

let g:NetrwIsOpen=0

function! ToggleNetrw()
    if g:NetrwIsOpen
        let i = bufnr("$")
        while (i >= 1)
            if (getbufvar(i, "&filetype") == "netrw")
                silent exe "bwipeout " . i
            endif
            let i-=1
        endwhile
        let g:NetrwIsOpen=0
    else
        let g:NetrwIsOpen=1
        silent Vexplore
    endif
endfunction

map <silent> t :call ToggleNetrw()<CR>

" Drop higlights on enter.
nnoremap <CR> :noh<CR><CR>

" FZF
nnoremap <c-z> :Files<CR>
inoremap <c-z> <esc>:Files<CR>

" Highlight word under cursor.
"set updatetime=300
"au! CursorMoved * set nohlsearch
"au! CursorHold * set hlsearch | let @/='\<'.expand("<cword>").'\>'
"set hlsearch

set laststatus=0
let g:airline_theme='minimalist'
let g:airline#extensions#tabline#enabled = 0
let g:airline_powerline_fonts = 1
let g:Powerline_symbols = 'fancy'

if !exists('g:airline_symbols')
    let g:airline_symbols = {}
endif

" unicode symbols
let g:airline_left_sep = '»'
let g:airline_left_sep = '▶'
let g:airline_right_sep = '«'
let g:airline_right_sep = '◀'
let g:airline_symbols.linenr = '␊'
let g:airline_symbols.linenr = '␤'
let g:airline_symbols.linenr = '¶'
let g:airline_symbols.branch = '⎇'
let g:airline_symbols.paste = 'ρ'
let g:airline_symbols.paste = 'Þ'
let g:airline_symbols.paste = '∥'
let g:airline_symbols.whitespace = 'Ξ'

" airline symbols
let g:airline_left_sep = ''
let g:airline_left_alt_sep = ''
let g:airline_right_sep = ''
let g:airline_right_alt_sep = ''
let g:airline_symbols.branch = ''
let g:airline_symbols.readonly = ''
let g:airline_symbols.linenr = ''
let g:airline_symbols.dirty = '*'

let g:airline_section_c = ''

" VimTeX
let g:tex_flavor = 'latex'
let g:vimtex_view_method = 'zathura'
let g:vimtex_compiler_latexmk = {
	\ 'build_dir': './Cache',
	\ 'callback': 1,
	\ 'continuous': 1,
	\ 'executable': 'latexmk',
	\ 'hooks': [],
	\ 'options': [
	\   '-synctex=1',
	\   '-file-line-error',
	\   '-interaction=nonstopmode',
	\   '-pdf',
	\   '-aux-directory=./Cache',
	\   '-output-directory=./Cache',
	\ ],
	\}

set list
set listchars=tab:\┊\ ,trail:·,eol:¬

" Color Scheme
"let g:monotone_color = [120, 100, 70] " Sets theme color to bright green.
"let g:monotone_secondary_hue_offset = 200 " Offset secondary by 200 deg.
"let g:monotone_emphasize_comments = 1 " Emphasize comments.

set termguicolors
let g:monotone_color_light = [5, 3, 1]
let g:monotone_color_dark  = [5, 3, 82]

colorscheme monotone

lua <<EOF
local dn = require('dark_notify')
dn.run({
	schemes = {
		dark = {
			background = "dark",
			colorscheme = "monotone"
		},
		light = {
			background = "light",
			colorscheme = "monotone"
		}
	},
	onchange = function(mode)
		print("Theme changed to", mode, "mode.")
	end
})
EOF

" Trailing space
autocmd BufWritePre * :%s/\s\+$//e

" Haskell indentation
autocmd FileType haskell setlocal shiftwidth=2 softtabstop=2 expandtab

let g:filetype_m="limbo"
au BufNewFile,BufRead *.[bm] set filetype=limbo

au BufRead,BufNewFile *.vh   set filetype=haskell
au BufRead,BufNewFile *.idr  set filetype=haskell
au BufRead,BufNewFile *.lj   set filetype=go
au BufRead,BufNewFile *.sex  set filetype=lisp
au BufRead,BufNewFile .env.* set filetype=sh

" Treesitter
lua require'nvim-treesitter.configs'.setup{highlight={enable=true}}
set foldmethod=expr
set foldexpr=nvim_treesitter#foldexpr()
autocmd BufReadPost,FileReadPost * normal zR

" LSP
lua require'mason'.setup{}

lua <<EOF
require("mason-tool-installer").setup {
	ensure_installed = {
		"vim-language-server",
		"codelldb", "stylua", "shfmt", "shellcheck", "black", "isort", "prettierd"
	},
	auto_update = false,
	run_on_start = true,
}
EOF
lua <<EOF
require("mason-lspconfig").setup {
	ensure_installed = { "zls" },
	automatic_installation = false,
}
EOF
let g:coq_settings = { 'auto_start': 'shut-up' }
lua <<EOF
local opts = { noremap=true, silent=true }
vim.keymap.set('n', '<space>e', vim.diagnostic.open_float, opts)
vim.keymap.set('n', '[d', vim.diagnostic.goto_prev, opts)
vim.keymap.set('n', ']d', vim.diagnostic.goto_next, opts)
vim.keymap.set('n', '<space>q', vim.diagnostic.setloclist, opts)

local on_attach = function(client, bufnr)
	-- Enable completion triggered by <c-x><c-o>
	vim.api.nvim_buf_set_option(bufnr, 'omnifunc', 'v:lua.vim.lsp.omnifunc')

	-- See `:help vim.lsp.*` for documentation on any of the below functions
	local bufopts = { noremap=true, silent=true, buffer=bufnr }
	vim.keymap.set('n', 'gD', vim.lsp.buf.declaration, bufopts)
	vim.keymap.set('n', 'gd', vim.lsp.buf.definition, bufopts)
	vim.keymap.set('n', 'K', vim.lsp.buf.hover, bufopts)
	vim.keymap.set('n', 'gi', vim.lsp.buf.implementation, bufopts)
	vim.keymap.set('n', '<C-k>', vim.lsp.buf.signature_help, bufopts)
	vim.keymap.set('n', '<space>wa', vim.lsp.buf.add_workspace_folder, bufopts)
	vim.keymap.set('n', '<space>wr', vim.lsp.buf.remove_workspace_folder, bufopts)
	vim.keymap.set('n', '<space>wl', function()
		print(vim.inspect(vim.lsp.buf.list_workspace_folders()))
	end, bufopts)
	vim.keymap.set('n', '<space>D', vim.lsp.buf.type_definition, bufopts)
	vim.keymap.set('n', '<space>rn', vim.lsp.buf.rename, bufopts)
	vim.keymap.set('n', '<space>ca', vim.lsp.buf.code_action, bufopts)
	vim.keymap.set('n', 'gr', vim.lsp.buf.references, bufopts)
	vim.keymap.set('n', '<space>f', vim.lsp.buf.formatting, bufopts)
end

local lsp_flags = {
	-- This is the default in Nvim 0.7+
	debounce_text_changes = 150,
}

local lsp = require('lspconfig')
local coq = require('coq')

lsp['zls'].setup(coq.lsp_ensure_capabilities({
	on_attach = on_attach,
	flags = lsp_flags,
}))
EOF

set mouse=a
set swapfile
