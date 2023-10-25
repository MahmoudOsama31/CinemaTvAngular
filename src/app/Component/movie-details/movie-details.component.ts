import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { HomeService } from 'src/app/services/home.service';
import { MovieModel } from 'src/models/MovieModel';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {
  model:MovieModel = null!;
  @ViewChild('videoElement') videoElement!: ElementRef;
  film: File | null = null;
  constructor(
    private router: Router,
    private activateRoute: ActivatedRoute,
    private homeService: HomeService,
    private sanitizer: DomSanitizer
  ){}
  ngOnInit(): void {
    this.activateRoute.paramMap.subscribe(params => {
      const movId = Number(params.get('id'));
      this.homeService.GetMovie(movId).subscribe({
        next:(mov)=>{
          this.model = mov;
          for (let i = 0; i < this.model.links.length; i++) {
            const link = this.model.links[i].movLink;
            if (link !== null && link !== '' && !link.startsWith('http')) {
              const urlImage = 'assets/videos/' + link;
              fetch(urlImage).then(res => res.blob()).then(blob => {
                var file = new File([blob], link);
                this.film = file;
                const video: HTMLVideoElement = this.videoElement.nativeElement;
                video.src = URL.createObjectURL(file);
                video.load();
              })
            }
          }         
        },
        error:(err)=>{
          console.log(err);
        }
      });
    });
  }
  getEmbedLink(strLink:string)
  {
    if (strLink !== null && strLink !== '') {
      if (strLink.includes('watch?v=')) {
        var link = strLink.replace('watch?v=', 'embed/');
        return this.sanitizer.bypassSecurityTrustResourceUrl(link);
      } else if (strLink.includes('youtu.be')) {
        var link = strLink.replace('youtu.be', 'youtube.com/embed/');
        return this.sanitizer.bypassSecurityTrustResourceUrl(link);
      }
    }
    return strLink;
  }
  GetMovieByActors(id:number)
  {
    this.router.navigate(['/home', id]);
  }
  DownloadVideo(link:string)
  {
    if (link) {
      if (link.startsWith('http')) {
        window.location.href = link;
      } else {
        window.location.href = 'assets/videos/' + link;
      }
    }
  }
  
}
