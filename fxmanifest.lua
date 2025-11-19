fx_version 'cerulean'
game 'gta5'

author 'Your Name'
description 'Advanced Character Creator with NFS Heat & TDU Solar Crown Style'
version '1.0.0'

-- Client scripts
client_scripts {
    'client/main.lua',
    'client/modules/*.lua'
}

-- Server scripts
server_scripts {
    '@oxmysql/lib/MySQL.lua',
    'server/main.lua',
    'server/modules/*.lua'
}

-- UI
ui_page 'ui/html/index.html'

-- Files
files {
    'ui/html/index.html',
    'ui/html/style.css',
    'ui/html/script.js',
    'ui/html/assets/**/*',
}

-- Dependencies
dependencies {
    'oxmysql',
    'ws_framework' -- or your framework of choice
}

-- Add this if you want to use the new audio system
-- data_file 'AUDIO_WAVEPACK' 'stream/'

-- Add this if you have custom audio files
-- files {
--     'stream/*.awc',
--     'stream/*.dat54.rel',
-- }
