scriptencoding utf-8
set encoding=utf-8

set clipboard+=unnamedplus

set nocompatible              " be iMproved, required
filetype off                  " required

" set the runtime path to include Vundle and initialize
set rtp+=~/.vim/bundle/Vundle.vim
call vundle#begin()
" alternatively, pass a path where Vundle should install plugins
"call vundle#begin('~/some/path/here')

" let Vundle manage Vundle, required
Plugin 'VundleVim/Vundle.vim'

" The following are examples of different formats supported.
" Keep Plugin commands between vundle#begin/end.
" plugin on GitHub repo
Plugin 'tpope/vim-fugitive'
" plugin from http://vim-scripts.org/vim/scripts.html
" Plugin 'L9'
" Git plugin not hosted on GitHub
Plugin 'git://git.wincent.com/command-t.git'
" git repos on your local machine (i.e. when working on your own plugin)

" The sparkup vim script is in a subdirectory of this repo called vim.
" Pass the path to set the runtimepath properly.
Plugin 'rstacruz/sparkup', {'rtp': 'vim/'}
" Install L9 and avoid a Naming conflict if you've already installed a
" different version somewhere else.
" Plugin 'ascenator/L9', {'name': 'newL9'}

Plugin 'vim-airline/vim-airline'
Plugin 'vim-airline/vim-airline-themes'

Plugin 'pangloss/vim-javascript'
Plugin 'mxw/vim-jsx'
Plugin 'JuliaEditorSupport/julia-vim'
Plugin 'arcticicestudio/nord-vim'

Plugin 'kovisoft/slimv'

Plugin 'purescript-contrib/purescript-vim'

Plugin 'chrisbra/Colorizer'

Plugin 'lervag/vimtex'

" All of your Plugins must be added before the following line
call vundle#end()            " required
filetype plugin indent on    " required
" To ignore plugin indent changes, instead use:
"filetype plugin on
"
" Brief help
" :PluginList       - lists configured plugins
" :PluginInstall    - installs plugins; append `!` to update or just :PluginUpdate
" :PluginSearch foo - searches for foo; append `!` to refresh local cache
" :PluginClean      - confirms removal of unused plugins; append `!` to auto-approve removal
"
" see :h vundle for more details or wiki for FAQ
" Put your non-Plugin stuff after this line


color nord

" Highlight color codes
autocmd VimEnter * ColorHighlight

set cinoptions=l1

set t_Co=256
set number
set rnu
syntax on

set cursorline
hi CursorLine   cterm=NONE ctermbg=black
hi CursorLineNR cterm=NONE ctermbg=black

"hi lschrs cterm=NONE ctermfg=black guifg=gray30
"match lschrs /$/
"2match lschrs /\t/

let $NVIM_TUI_ENABLE_CURSOR_SHAPE = 0
set guicursor=
set guicursor=n-v:hor50,i:ver25

filetype plugin indent on

set tabstop=4       " The width of a TAB is set to 4.
set shiftwidth=4    " Indents will have a width of 4
set softtabstop=4   " Sets the number of columns for a TAB
"set expandtab       " Expand TABs to spaces

set list
set listchars=tab:\|\ ,trail:·,eol:¬
hi NonText ctermfg=8 guifg=black cterm=bold

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

nnoremap <CR> :noh<CR><CR>

" Highlight word under cursor.
"set updatetime=300
"au! CursorMoved * set nohlsearch
"au! CursorHold * set hlsearch | let @/='\<'.expand("<cword>").'\>'
"set hlsearch


"let g:airline_theme='wombat'
let g:airline#extensions#tabline#enabled = 1
let g:airline_powerline_fonts = 1

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

" VimTeX
let g:tex_flavor = 'latex'
let g:vimtex_view_method = 'zathura'
let g:vimtex_compiler_latexmk = {
	\ 'build_dir' : './Cache',
	\ 'callback' : 1,
	\ 'continuous' : 1,
	\ 'executable' : 'latexmk',
	\ 'hooks' : [],
	\ 'options' : [
	\   '-synctex=1',
	\   '-file-line-error',
	\   '-interaction=nonstopmode',
	\   '-pdf',
	\   '-aux-directory=./Cache',
	\   '-output-directory=./Cache',
	\ ],
	\}

set cmdheight=1
set cmdwinheight=1

" Trailing space
autocmd BufWritePre * :%s/\s\+$//e

" Haskell indentation
autocmd FileType haskell setlocal shiftwidth=2 softtabstop=2 expandtab


let g:filetype_m="limbo"
au BufNewFile,BufRead *.[bm] set filetype=limbo

au BufRead,BufNewFile *.vh   set filetype=haskell
au BufRead,BufNewFile *.idr  set filetype=haskell

au BufRead,BufNewFile *.sex  set filetype=lisp

set mouse=a
