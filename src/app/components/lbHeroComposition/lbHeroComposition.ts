export function lbHeroComposition(): angular.IDirective {
    return {
        restrict: 'E',
        template: `
			<div ng-if="video" style="height:360px;min-height:360px;">
				<youtube-video video-url="video" player-width="'100%'" player-height="'360px'" player-vars="{autoplay:1,showinfo:0}"></youtube-video>
			</div>
			<div ng-if="!video" style="height:240px;min-height:240px;background-image:url(/assets/images/sheet-music.jpg);background-size:cover;background-repeat:no-repeat;background-position:center center;"></div>
		`,
        scope: {
            video: '='
        }
    };
}
