import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild
} from '@angular/core';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

@Component({
  selector: 'app-bg-cloud',
  templateUrl: './bg-cloud.component.html',
  styleUrls: ['./bg-cloud.component.css']
})
export class BgCloudComponent implements AfterViewInit, OnDestroy {
  @ViewChild('networkCanvas', { static: true })
  canvasRef!: ElementRef<HTMLCanvasElement>;

  private ctx!: CanvasRenderingContext2D;
  private nodes: Node[] = [];
  private animationId?: number;
  private width = 0;
  private height = 0;
  private mouse = { x: -1000, y: -1000 };

  private readonly COLORS = ['#a78bc8', '#c9b6e0', '#e8b8cc', '#c8e0d5'];
  private readonly NODE_COUNT = 60;
  private readonly MAX_LINK_DISTANCE = 150;

  ngAfterViewInit(): void {
    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d')!;

    this.resize();
    this.createNodes();
    this.animate();
    this.createBubbles();
    this.createPetals();
    this.initCursorTrail();

    window.addEventListener('resize', this.resize);
    window.addEventListener('mousemove', this.onMouseMove);
  }

  ngOnDestroy(): void {
    if (this.animationId) cancelAnimationFrame(this.animationId);
    window.removeEventListener('resize', this.resize);
    window.removeEventListener('mousemove', this.onMouseMove);
  }

  private resize = (): void => {
    const canvas = this.canvasRef.nativeElement;
    const dpr = window.devicePixelRatio || 1;
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    canvas.width = this.width * dpr;
    canvas.height = this.height * dpr;
    canvas.style.width = this.width + 'px';
    canvas.style.height = this.height + 'px';
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.ctx.scale(dpr, dpr);
  };

  private createNodes(): void {
    this.nodes = [];
    for (let i = 0; i < this.NODE_COUNT; i++) {
      this.nodes.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        radius: Math.random() * 2.5 + 1.5
      });
    }
  }

  private onMouseMove = (e: MouseEvent): void => {
    this.mouse.x = e.clientX;
    this.mouse.y = e.clientY;
  };

  private animate = (): void => {
    this.animationId = requestAnimationFrame(this.animate);
    this.ctx.clearRect(0, 0, this.width, this.height);

    for (const node of this.nodes) {
      node.x += node.vx;
      node.y += node.vy;
      if (node.x < 0 || node.x > this.width) node.vx *= -1;
      if (node.y < 0 || node.y > this.height) node.vy *= -1;
    }

    // Connexions
    for (let i = 0; i < this.nodes.length; i++) {
      const a = this.nodes[i];

      const dxMouse = a.x - this.mouse.x;
      const dyMouse = a.y - this.mouse.y;
      const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
      if (distMouse < 200) {
        const alpha = (1 - distMouse / 200) * 0.5;
        this.ctx.strokeStyle = `rgba(167, 139, 200, ${alpha})`;
        this.ctx.lineWidth = 0.8;
        this.ctx.beginPath();
        this.ctx.moveTo(a.x, a.y);
        this.ctx.lineTo(this.mouse.x, this.mouse.y);
        this.ctx.stroke();
      }

      for (let j = i + 1; j < this.nodes.length; j++) {
        const b = this.nodes[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < this.MAX_LINK_DISTANCE) {
          const alpha = (1 - dist / this.MAX_LINK_DISTANCE) * 0.3;
          this.ctx.strokeStyle = `rgba(201, 182, 224, ${alpha})`;
          this.ctx.lineWidth = 0.6;
          this.ctx.beginPath();
          this.ctx.moveTo(a.x, a.y);
          this.ctx.lineTo(b.x, b.y);
          this.ctx.stroke();
        }
      }
    }

    // Points
    for (let i = 0; i < this.nodes.length; i++) {
      const node = this.nodes[i];
      const color = this.COLORS[i % this.COLORS.length];
      this.ctx.beginPath();
      this.ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = color;
      this.ctx.globalAlpha = 0.85;
      this.ctx.fill();
      this.ctx.globalAlpha = 1;
    }
  };

  /** ✨ Crée 25 bulles interactives */
  private createBubbles(): void {
    const container = document.getElementById('cloud-bubbles');
    if (!container) return;

    const colors = ['#a78bc8', '#c9b6e0', '#e8b8cc', '#c8e0d5', '#f5d0c5'];

    for (let i = 0; i < 25; i++) {
      const b = document.createElement('span');
      b.className = 'bubble';
      const size = Math.random() * 40 + 15;
      b.style.width = size + 'px';
      b.style.height = size + 'px';
      b.style.left = Math.random() * 100 + '%';
      b.style.top = Math.random() * 100 + '%';
      b.style.background = colors[Math.floor(Math.random() * colors.length)];
      b.style.animationDelay = Math.random() * 8 + 's';
      b.style.animationDuration = (Math.random() * 8 + 8) + 's';
      container.appendChild(b);
    }
  }

  /** 🌸 Crée 30 pétales qui tombent */
  private createPetals(): void {
    const container = document.getElementById('cloud-petals');
    if (!container) return;

    const colors = ['#e8b8cc', '#f5d0c5', '#c9b6e0', '#a78bc8'];

    for (let i = 0; i < 30; i++) {
      const p = document.createElement('span');
      p.className = 'petal';
      const size = Math.random() * 8 + 6;
      p.style.width = size + 'px';
      p.style.height = size + 'px';
      p.style.left = Math.random() * 100 + '%';
      p.style.background = colors[Math.floor(Math.random() * colors.length)];
      p.style.animationDelay = Math.random() * 15 + 's';
      p.style.animationDuration = (Math.random() * 15 + 15) + 's';
      p.style.opacity = (Math.random() * 0.4 + 0.5).toString();
      container.appendChild(p);
    }
  }

  /** ✨ Traîne de curseur */
  private initCursorTrail(): void {
    const container = document.getElementById('cursor-trail');
    if (!container) return;

    let lastX = 0;
    let lastY = 0;
    let throttle = 0;

    document.addEventListener('mousemove', (e) => {
      const now = Date.now();
      if (now - throttle < 40) return;
      throttle = now;

      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      if (dx * dx + dy * dy < 400) return;

      lastX = e.clientX;
      lastY = e.clientY;

      const dot = document.createElement('span');
      dot.className = 'trail-dot';
      dot.style.left = e.clientX + 'px';
      dot.style.top = e.clientY + 'px';
      container.appendChild(dot);
      setTimeout(() => dot.remove(), 900);
    });
  }
}