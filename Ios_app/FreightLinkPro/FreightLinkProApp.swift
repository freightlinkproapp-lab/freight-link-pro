import SwiftUI
import Stripe

@main
struct FreightLinkProApp: App {
    init() {
        STPAPIClient.shared.publishableKey = "pk_live_REPLACE_WITH_YOUR_STRIPE_PUBLISHABLE_KEY"
    }

    var body: some Scene {
        WindowGroup {
            RootView()
        }
    }
}
