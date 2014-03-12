<?php
/**
 * @file
 * Used to render PHP files & save rendered output into .htm files
 *
 * usage:
 * _tplrender.php?tpl=index
 */
include('templates/htmLawed/htmLawed.php');
 
 
define('TEMPLATE_PATH', 'templates');
define('TEMPLATE_INC_PATH', 'templates/includes');
define('OUTPUT_FILE_TYPE', '.htm');
define('HEAD_TITLE_DEFAULT', 'AppStrap Bootstrap Theme by Themelize.me');

global $titles, $tags, $types, $users, $imgs;
$titles = array('Enim augue elit adipiscing placerat natoque', 'amet urna integer urna enim, sit arcu pid in nec?', 'Magna aliquet diam mauris tortor turpis vel porta', 'a nec in sed hac ultrices cursus', 'Urna natoque in phasellus rhoncus aliquet penatibus', 'Turpis odio dictumst tempor ac et!', 'Porta risus porttitor facilisis sit dapibus', 'Odio, nunc platea mattis, mid et', 'Nisi rhoncus nisi porttitor risus ridiculus tristique, quis.');
$tags = array('culture', 'general', 'coding', 'design', 'weather', 'jobs', 'health');
$types = array('news', 'feature', 'event', 'video', 'podcast');
$users = array('Tom', 'Alex', 'Erin', 'Dave', 'Joe', 'Jo');
$user_pics = array('adele.jpg', 'bono.jpg', 'deniro.jpg', 'jimi.jpg', 'jobs.jpg', 'obama.jpg');
$imgs = array('frog.jpg', 'ladybird.jpg', 'ape.jpg', 'fly.jpg', 'water-pump.jpg', 'butterfly.jpg', 'bee.jpg');

/**
 * Helper functions
 */
function _theme_render_profile_picture() {
  global $titles, $tags, $users, $user_pics, $imgs;
  return '<img src="img/team/'. $user_pics[array_rand($user_pics, 1)] .'" alt="Picture of '. $users[array_rand($users, 1)] .'" class="media-object img-thumbnail img-responsive" />';
}
function _theme_render_comment_list($count) {
  global $titles, $tags, $users, $imgs;
  while ($i <= $count) {
    $date = strtotime( '-'.mt_rand(0,30).' days');
    $title = $titles[array_rand($titles, 1)];
    $output[$date] = '
                  <li class="media">
		    <a class="pull-left" href="#">
		      '. _theme_render_profile_picture() .'
		    </a>
		    <div class="media-body">
		      <ul class="list-inline meta text-muted">
			<li><i class="fa fa-calendar"></i> '. date('D jS M Y', $date) .'</li>
			<li><i class="fa fa-user"></i> <a href="#">'. $users[array_rand($users, 1)] .'</a></li>
		      </ul>
		      <h5 class="media-heading">'. $title .'</h5>
		      <p>'. $title . $title . $title . $title .'</p>
		    </div>
		  </li>';
    $i++;
  }
  krsort($output);
  return implode("\n", $output);
}
function _theme_render_blog_list($count = 12, $date_colspan = 1, $body_colspan = 11, $short = FALSE) {
  global $titles, $tags, $types, $users, $imgs;
  
  static $output;
  
  if (!empty($output[$count])) {
    return implode("\n\n", $output[$count]);
  }
  
  while ($i <= $count) {
    $media_class = '';
    if ($i == 3 || $i == 9) {
      $media_class = " media-object-full";
    }
    
    $date = strtotime( '-'.mt_rand(0,30).' days');
      $user = $users[array_rand($users, 1)];
      $output[$count][$date] = '
	      <!-- Blog post -->
	      <div class="media row">
		<div class="col-md-'. $date_colspan .' date-md">
		  <!-- Date desktop -->
		  <div class="date-wrapper">
		    <span class="date-m">'. date('M', $date) .'</span>
		    <span class="date-d">'. date('d', $date) .'</span>
		  </div>
		  <!-- Meta details desktop -->
		  <p class="muted">
		    <i class="fa fa-user"></i> <a href="#">'. $user .'</a>
		  </p>		
		</div>
		<div class="col-md-'. $body_colspan .' media-body">            
		  <div class="tags"><a href="#" class="tag">'. $tags[array_rand($tags, 1)] .'</a> / <a href="#" class="type">'. $types[array_rand($types, 1)] .'</a></div>
		  <h4 class="title media-heading"><a href="blog-post.htm">'. $titles[array_rand($titles, 1)] .'</a></h4>
		  
		  <!-- Meta details mobile -->
		  <ul class="list-inline meta text-muted">
		    <li><i class="fa fa-calendar"></i> '. date('D jS M Y', $date) .'</li>
		    <li><i class="fa fa-user"></i> <a href="#">'. $user .'</a></li>
		  </ul>
		  <a href="blog-post.htm" class="media-object'. $media_class .'">
		    <img src="img/blog/'. $imgs[array_rand($imgs, 1)] .'" alt="Picture of frog by Ben Fredericson" class="img-responsive" />
		  </a>
		  <p>Nam risus magna, fringilla sit amet blandit viverra, dignissim eget est. Ut <strong>commodo ullamcorper risus nec</strong> mattis. Morbi tincidunt posuere turpis eu laoreet. Nulla facilisi. Aenean at massa leo. Vestibulum in varius arcu.</p>
		  <p>Nam risus magna, fringilla sit amet blandit viverra, dignissim eget est. Ut <strong>commodo ullamcorper risus nec</strong> mattis</p>
		  <ul class="list-inline links">
		    <li><a href="blog-post.htm" class="btn btn-default btn-xs"><i class="fa fa-circle-arrow-right"></i> Read more</a></li>
		    <li><a href="blog-post.htm#comments" class="btn btn-default btn-xs"><i class="fa fa-comment"></i> '. mt_rand(0,100) .' Comments</a></li>
		  </ul>
		</div>
	      </div>';
    $i++;
  }
  krsort($output[$count]);
  return implode("\n\n", $output[$count]);
}
 
function _theme_render_project_list($count = 4, $col_span = 4, $type = 'isotope') {
  $projects[] = array(
    'img' => 'img/customers/google.jpg',
    'title' => 'Google',
    'href' => 'http://themelize.me',
  );
  $projects[] = array(
    'img' => 'img/customers/youtube.png',
    'title' => 'YouTube',
    'href' => 'http://themelize.me',    
  );
  $projects[] = array(
    'img' => 'img/customers/yahoo.jpeg',
    'title' => 'Yahoo',
    'href' => 'http://themelize.me',    
  );
  $projects[] = array(
    'img' => 'img/customers/amazon.jpg',
    'title' => 'Amazon',
    'href' => 'http://themelize.me',    
  );
  $projects[] = array(
    'img' => 'img/customers/ebay.png',
    'title' => 'eBay',
    'href' => 'http://themelize.me',    
  );
  $projects[] = array(
    'img' => 'img/customers/github.png',
    'title' => 'GitHub',
    'href' => 'http://themelize.me',    
  );
  $projects[] = array(
    'img' => 'img/customers/bitbucket.png',
    'title' => 'BitBucket',
    'href' => 'http://themelize.me',    
  );
  $projects[] = array(
    'img' => 'img/customers/less.png',
    'title' => 'LESS',
    'href' => 'http://themelize.me',    
  );
  $projects[] = array(
    'img' => 'img/customers/html5.png',
    'title' => 'HTML5',
    'href' => 'http://themelize.me',    
  );
  $projects[] = array(
    'img' => 'img/customers/css3.jpg',
    'title' => 'CSS3',
    'href' => 'http://themelize.me',    
  );  
  $projects[] = array(
    'img' => 'img/customers/jquery.png',
    'title' => 'jQuery',
    'href' => 'http://themelize.me',    
  );
  $projects[] = array(
    'img' => 'img/customers/vodafone.jpg',
    'title' => 'Vodafone',
    'href' => 'http://themelize.me',    
  ); 
  
  $types = array('type-web', 'type-design', 'type-media');
  $count--;
  $output = $used = array();
  $i = 0;
  shuffle($projects);
  while ($i <= $count) {
      
    $project_id = $i;
    $type_id = array_rand($types, 1);

    
    if ($type == 'isotope') {
    $output[] = '
      <li class="isotope-item customer '. $types[$type_id]  .'">
        <a href="'. $projects[$project_id]['href'] .'">
	  <span class="inner-wrapper">
	    <span class="img-wrapper"><img src="'. $projects[$project_id]['img'] .'" alt="'. $projects[$project_id]['title'] .'" class="img-responsive" /></span>
	    <span class="title">'. $projects[$project_id]['title'] .'</span>
	    <span class="description">Rhoncus adipiscing, magna integer cursus augue eros lacus porttitor magna. Dictumst, odio! Elementum tortor sociis in eu dis dictumst pulvinar lorem nec aliquam a nascetur.</span>
	  </span>
	</a>
      </li>    
    ';
    }
    else {
    $output[] = '
      <li class="customer '. $types[$type_id] .'" data-quicksand-id="id-'. $i .'" data-quicksand-tid="'. $types[$type_id] .'">
        <a href="'. $projects[$project_id]['href'] .'">
	  <span class="inner-wrapper">
	    <span class="img-wrapper"><img src="'. $projects[$project_id]['img'] .'" alt="'. $projects[$project_id]['title'] .'" /></span>
	    <span class="title">'. $projects[$project_id]['title'] .'</span>
	    <span class="description">Rhoncus adipiscing, magna integer cursus augue eros lacus porttitor magna. Dictumst, odio! Elementum tortor sociis in eu dis dictumst pulvinar lorem nec aliquam a nascetur.</span>
	  </span>
	</a>
      </li>    
    ';  
    }
    
    $i++;
    
    if (count($used) == $col_span) {
      $used = array();
    }
  }
  
  return implode('', $output);
}


//alter this per theme
$all_pages = array(
  'index',
  'features',
  'pricing',
  'customers',
  'about',
  'team' => array('active' => 'about'),
  'contact' => array('active' => 'about'),
  'blog',
  'blog-leftbar' => array('active' => 'blog'), 
  'blog-post' => array('active' => 'blog'),
  
  'login' => array('active' => 'pages'),
  'signup' => array('active' => 'pages'),
  
  'starter' => array('active' => 'pages'), 
  'index-static' => array('active' => 'pages'),
  'colours' => array('active' => 'pages'),
  'elements' => array('active' => 'pages'),
  'bs-mobile-menu' => array('active' => 'pages'),
  '404' => array('active' => 'pages'),
  
  'flexslider-default' => array('active' => array('pages', 'sliders')),
  'flexslider-full' => array('active' => array('pages', 'sliders')),
  'flexslider-behind' => array('active' => array('pages', 'sliders')),
  'flexslider-boxed' => array('active' => array('pages', 'sliders')),
  
  'slider-revolution-default' => array('active' => array('pages', 'sliders')),
  'slider-revolution-full' => array('active' => array('pages', 'sliders')),
  'slider-revolution-behind' => array('active' => array('pages', 'sliders')),
  'slider-revolution-boxed' => array('active' => array('pages', 'sliders')),
  
  'navbar-full' => array('active' => 'pages'),
);

//settings
$navbar_class = 'navbar-static-top'; //navbar-static-top
$body_class_default = 'page'; //has-navbar-fixed-top';
$head_title = HEAD_TITLE_DEFAULT;
$theme_title = '<span>App</span>Strap<span>.</span>';
$theme_slogan = 'Responsive HTML Theme';

$plugins = array();
$plugins['prism'] = 'prism';
$plugins['sliders'] = array('flexslider', 'revolution'); //, 'layerslider');

//render all in one go
if ($_GET['tpl'] == 'all') {
  print "--------------------------------------<br />"; 
  print "Rendering of all templates initiated<br />";
  print "--------------------------------------<br />";
  
  foreach ($all_pages as $k => $data) {
    $mobile_menu_type = 'jpanel-menu';
    $navbar_full_width = FALSE;
    $navbar_class = 'navbar-static-top';
    $page = $data;
    if (is_array($data)) {
      $page = $k;
    }
    
    $php_tpl = TEMPLATE_PATH .'/'. $page .'.php';
    $output_file = $page . OUTPUT_FILE_TYPE;
    print_r($page);
    if (file_exists($php_tpl)) {
      print "$php_tpl exists<br />";
      $_GET['tpl'] = $page;
      
      if (!empty($data['active'])) {
	print_r($data['active']);
        $_GET['active'] = $data['active'];
      }
      
      $readme[] = '* '. ucfirst($page) .' ('. $page .'.htm)';
      
      $body_classes = array();
      $body_classes[] = $body_class_default;
      $body_classes[] = 'page-'. $_GET['tpl'];
      $body_classes = implode(' ', $body_classes);
      ob_start();
      include($php_tpl);
      file_put_contents($output_file, ob_get_contents());
      // end buffering and displaying page
      ob_end_flush();
    }
  }
  
}
//specific template
else {
  $mobile_menu_type = 'jpanel-menu';
  $php_tpl = TEMPLATE_PATH .'/'. $_GET['tpl'] .'.php';
  $output_file = $_GET['tpl'] . OUTPUT_FILE_TYPE;
  
  print "--------------------------------------<br />"; 
  print "Template rendering initiated<br />";
  print "--------------------------------------<br />"; 
  print "Source: $php_tpl<br />";
  print "Output: $php_tpl<br />";
  print "--------------------------------------<br /><br />";
 
  if (file_exists($php_tpl)) {
    print "$php_tpl exists<br />";
    $body_classes = array();
    $body_classes[] = $body_class_default;
    $body_classes[] = 'page-'. $_GET['tpl'];
    $body_classes = implode(' ', $body_classes);    
    ob_start();
    include($php_tpl);
    file_put_contents($output_file, ob_get_contents());
    // end buffering and displaying page
    ob_end_flush();
  }
}

print '
----------------------------<br />
PAGES PROVIDED ('. count($readme) .')<br />
----------------------------<br />';
print implode('<br />', $readme);
