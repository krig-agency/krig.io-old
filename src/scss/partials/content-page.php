
<article class="main-article maincol two-col">
  <div class="inner">

    <?php

    $articleimg = '';
    $image = get_field('artikelbild');

    if(!empty($image)){

      $articleimgurl = $image['sizes'][ 'article-top' ];
    }
    else {
      $articleimgurl = get_the_post_thumbnail_url( null, 'article-top' );
    }

    if ( $articleimgurl ) {
      $articleimg = esc_url( $articleimgurl );
      ?>
      <div class="square top-img" style="background-image: url(<?php echo $articleimg; ?>);"></div>
      <?php
    }
    ?>


    <div class="main-article__content">
      <h1><?php the_title(); ?></h1>
      <?php
      if(get_field('ingress')){
        echo '<p class="ingress">' . get_field('ingress') . '</p>';
      }
      ?>


      <?php if(is_page(array('evenemang', 'test' ))) {
        $share = 0;
      } else {
        $share = 1;
      }
      if((isset($share)) && ($share == 1)){ ?>

        <div class="article-quote">
          <?php
          if(get_field('quote')){
            echo '<p>' . get_field('quote') . '</p>';
          }
          ?>

          <?php
          if(get_field('lank')){
            echo '<a class="external-link" target="_blank" href="' . get_field('lank') . '"">' . get_field('lanktext') . '</a>';
          }
          else {
            ?>
            <ul class="share">
              <li><a class="fb" href="https://facebook.com/sharer.php?u=<?=get_the_permalink();?>" target="_blank" title="Dela på Facebook"><span>Dela på Facebook</span></a></li>
              <li><a class="tw" href="https://twitter.com/share?url=<?=get_the_permalink();?>" target="_blank" title="Dela på Twitter"><span>Dela på Twitter</span></a></li>
              <li><a class="in" href="https://linkedin.com/shareArticle?url=<?=get_the_permalink();?>" target="_blank" title="Dela på Linked in"><span>Dela på Linked in</span></a></li>
            </ul>

            <?php
          }
          ?>

        </div>

        <?php }  ?>

        <?php the_content();?>
        <?php if( get_field('lattlast') ): ?>
          <div id="easy-read" class="lightbox"><?php the_field('lattlast'); ?></div>
        <?php endif; ?>
      </div>

      <div class="main-article__footer">
        <ul>
          <li><a class="print" href="javascript:window.print()">Skriv ut</a></li>
          <?php if( get_field('lattlast') ): ?>
            <li><a class="lattlast" href="#" data-featherlight="#easy-read">Lättläst</a></li>
          <?php endif; ?>
        </ul>
      </div>


    </div>
  </article>

  <?php wp_link_pages(['before' => '<nav class="page-nav"><p>' . __('Pages:', 'sage'), 'after' => '</p></nav>']); ?>
