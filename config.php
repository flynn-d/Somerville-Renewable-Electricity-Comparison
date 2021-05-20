<?php

return [
    'production' => false,
    'baseUrl' => 'https://somerville-renewable-electricity.netlify.app/',
    'site' => [
        'title' => 'Comparing Renewable Electricity for Somerville, MA',
        'description' => 'Costs and Benefits of Renewable Electricity from Somerville CCA',
        'image' => 'default-share.png',
    ],
    'owner' => [
        'name' => 'Dan Flynn',
        #'twitter' => 'johndoe',
        'github' => 'flynn-d',
    ],
    'services' => [
        'cmsVersion' => '2.10.125',
        'analytics' => 'UA-XXXXX-Y',
        'disqus' => 'artisanstatic',
        'formcarry' => 'XXXXXXXXXXXX',
        'cloudinary' => [
            'cloudName' => 'artisanstatic',
            'apiKey' => '365895137117119',
        ],
    ],
    'collections' => [
        'posts' => [
            'path' => 'posts/{filename}',
            'sort' => '-date',
            'extends' => '_layouts.post',
            'section' => 'postContent',
            'isPost' => true,
            'comments' => true,
            'tags' => [],
            'hasTag' => function ($page, $tag) {
                return collect($page->tags)->contains($tag);
            },
            'prettyDate' => function ($page, $format = 'M j, Y') {
                return date($format, $page->date);
            },
        ],
        'tags' => [
            'path' => 'tags/{filename}',
            'extends' => '_layouts.tag',
            'section' => '',
            'name' => function ($page) {
                return $page->getFilename();
            },
        ],
    ],
];
