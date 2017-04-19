<?php

namespace Deployer;

require 'recipe/common.php';

server('prod', 'krig.io')
    ->user('razitazi')
    ->identityFile()
    ->forwardAgent()
    ->set('deploy_path', '/var/www/krig.io/html')
    ->stage('production');

server('kriga', 'kriga.krig.io')
    ->user('razitazi')
    ->identityFile()
    ->forwardAgent()
    ->set('deploy_path', '/var/www/kriga.krig.io/html')
    ->stage('development');

// Git configuration.
set('repository', 'https://github.com/krig-io/krig.io.git');

// Deploy configuration.
set('ssh_type','native');

// set('ssh_type', 'native');
set('ssh_multiplexing', true);

task('deploy', [
    'deploy:prepare',
    'deploy:lock',
    'deploy:release',
    'deploy:update_code',
    'deploy:shared',
    'deploy:writable',
    'deploy:vendors',
    'deploy:clear_paths',
    'deploy:symlink',
    'deploy:unlock',
    'cleanup',
    'success'
]);
