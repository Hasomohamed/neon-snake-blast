import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const Privacy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-game-bg via-background to-game-bg p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button 
            variant="neon-primary" 
            size="icon"
            onClick={() => window.history.back()}
            className="shrink-0"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-3xl font-bold text-neon-cyan animate-pulse-neon">
            Privacy Policy
          </h1>
        </div>

        <Card className="bg-card/50 backdrop-blur-sm border-neon-cyan/30">
          <CardHeader>
            <CardTitle className="text-neon-purple">Cobra Snake Blast Privacy Policy</CardTitle>
            <p className="text-sm text-muted-foreground">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </CardHeader>
          <CardContent className="space-y-6 text-sm">
            <section>
              <h3 className="text-lg font-semibold text-neon-green mb-3">Information We Collect</h3>
              <p className="text-muted-foreground leading-relaxed">
                Cobra Snake Blast is designed with privacy in mind. We do not collect any personal information 
                or data from users. All game data including high scores, settings, and statistics are stored 
                locally on your device using browser local storage.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-neon-green mb-3">Data Storage</h3>
              <p className="text-muted-foreground leading-relaxed">
                The following data is stored locally on your device:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1 text-muted-foreground ml-4">
                <li>High scores and game statistics</li>
                <li>Audio settings preferences (sound/music on/off)</li>
                <li>Game mode preferences</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-2">
                This data never leaves your device and is not transmitted to any servers.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-neon-green mb-3">Third-Party Services</h3>
              <p className="text-muted-foreground leading-relaxed">
                Cobra Snake Blast does not use any third-party analytics, advertising, or tracking services. 
                The game operates entirely offline after initial download.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-neon-green mb-3">Permissions</h3>
              <p className="text-muted-foreground leading-relaxed">
                The app may request the following permissions:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1 text-muted-foreground ml-4">
                <li><strong>Audio:</strong> To play sound effects and background music</li>
                <li><strong>Storage:</strong> To save game data locally on your device</li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-neon-green mb-3">Children's Privacy</h3>
              <p className="text-muted-foreground leading-relaxed">
                Our game is safe for children. We do not collect any personal information from anyone, 
                including children under 13 years of age.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-neon-green mb-3">Changes to This Policy</h3>
              <p className="text-muted-foreground leading-relaxed">
                We may update this privacy policy from time to time. Any changes will be reflected in the 
                "Last updated" date above. Continued use of the app after any changes constitutes acceptance 
                of the new policy.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-neon-green mb-3">Contact</h3>
              <p className="text-muted-foreground leading-relaxed">
                If you have any questions about this privacy policy, please contact us through the app 
                store where you downloaded the game.
              </p>
            </section>

            <div className="mt-8 p-4 bg-neon-cyan/10 border border-neon-cyan/20 rounded-lg">
              <p className="text-neon-cyan font-medium text-center">
                🔒 Your privacy is important to us. This game collects no personal data.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Privacy;