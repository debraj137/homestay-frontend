import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "../auth/auth.service";
// import { AuthService } from "../services/auth.service";

export const ownerGuard: CanActivateFn = (route, state) => {
    const authService = inject(AuthService);
    const router = inject(Router);
    if (authService.isLoggedIn) {
        if (authService.isOwner) {
            return true
        }
        else {
            router.navigateByUrl("/");
            return false
        }

    }
    else {
        router.navigateByUrl("/auth/login");
        return false
    }
}